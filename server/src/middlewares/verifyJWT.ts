import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface Request extends ExpressRequest {
  id?: string;
  user?: string;
  roles?: string;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader === 'string' && !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (typeof authHeader === 'string') {
    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.id = decoded.userInfo.id;
        req.user = decoded.userInfo.email;
        req.roles = decoded.userInfo.role;
        next();
      },
    );
  }
};
