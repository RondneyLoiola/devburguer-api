import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMiddleware = (req, res, next) => {
  //console.log(req.headers)

  //split() -> separa e transforma em array
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const token = authToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw Error();
      }

      // cria um campo userId na request
      //console.log(decoded)
      req.userId = decoded.id;
      req.userIsAdmin = decoded.admin
    });
  } catch (_error) {
    return res.status(401).json({ error: 'Token is invalid!' });
  }

  return next();
};

export default authMiddleware;
