import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(req, res) {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      admin: yup.boolean().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { name, email, password, admin } = req.body;

    //verificar se o usuário existe
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already taken!',
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }

  async index(_req, res) {
    const users = await User.findAll();

    return res.status(200).json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted!' });
  }
}

export default new UserController();
