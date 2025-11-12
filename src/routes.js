import { Router } from 'express';
import { v4 } from 'uuid';
import User from './app/models/User.js';

const routes = new Router();

routes.get('/', async (_req, res) => {
  const user = {
    id: v4(),
    name: 'Rondney',
    email: 'rondney@gmail.com',
    password_hash: '123456',
    admin: true,
  };

  await User.create(user);

  res.status(201).json(user);
});

export default routes;
