import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user): void => {
      if (err) {
        res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
