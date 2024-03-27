import { Request, Response } from 'express';
import User from '@models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

// @desc Register
// @route POST /api/auth/register
// @access Public - register the user
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, phone, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'customer',
      phone,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  },
);

// @desc Login
// @route POST /api/auth/login
// @access Public - login the user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res
      .status(401)
      .json({ message: 'The email address or password is incorrect' });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    res
      .status(401)
      .json({ message: 'The email address or password is incorrect' });
    return;
  }

  const accessToken = jwt.sign(
    {
      userInfo: {
        email: user.email,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '1m' },
  );

  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '1d' },
  );

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

// @desc Refresh
// @route GET /api/auth/refresh
// @access Public - refresh the access token
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      const user = await User.findOne({ where: { email: decoded.email } });

      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const accessToken = jwt.sign(
        {
          userInfo: {
            email: user.email,
            role: user.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '1m' },
      );
      res.json({ accessToken });
    },
  );
});

// @desc Logout
// @route GET /api/auth/logout
// @access Public - Just to clear the cookie if it exists
export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
  res.json({ message: 'Cookie cleared' });
};
