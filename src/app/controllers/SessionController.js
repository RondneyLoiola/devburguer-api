import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(req, res) {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(req.body, { strict: true });

    const emailOrPasswordIncorrect = () => {
      return res.status(400).json({ error: 'Email or password incorrect!' });
    };

    if (!isValid) {
      emailOrPasswordIncorrect();
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      emailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorrect) {
      emailOrPasswordIncorrect();
    }

    // md5 generator
    const token = jwt.sign({ id: existingUser.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    });
  }
}

export default new SessionController();
