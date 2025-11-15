import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      admin: yup.boolean().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    const { name, email, password, admin } = request.body;

    //verificar se o usuário existe
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      return response.status(400).json({
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

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
