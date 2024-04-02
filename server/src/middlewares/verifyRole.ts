import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface Decoded {
  userInfo: {
    id: string;
    email: string;
    role: string;
  };
}

const verifyRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const userRole = (decoded as Decoded).userInfo.role as string;

      if (userRole === role) {
        next();
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };

export default verifyRole;
