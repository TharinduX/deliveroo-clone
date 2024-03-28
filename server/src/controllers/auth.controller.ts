import { Request, Response } from 'express';
import User from '@models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import ajvModule from 'ajv';
import registerSchema from '@schemas/register.schema.js';
import loginSchema from '@schemas/login.schema.js';
import googleLoginSchema from '@schemas/googlelogin.schema.js';

dotenv.config();
const Ajv = ajvModule.default;
const ajv = new Ajv();

// @desc Register
// @route POST /api/auth/register
// @access Public - register the user by email and password
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const validate = ajv.compile(registerSchema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ message: validate.errors });
      return;
    }
    const { email, password, phone, firstName, lastName, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash: hashedPassword,
      role,
      phone,
      firstName,
      lastName,
      provider: 'email',
    });

    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  },
);

// @desc Register with Google
// @route POST /api/auth/google
// @access Public - register the user by google
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const validate = ajv.compile(googleLoginSchema);
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).json({ message: validate.errors });
    return;
  }

  const { token, role } = req.body;

  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);

    const {
      email,
      given_name: givenName,
      family_name: familyName,
    } = response.data;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        firstName: givenName,
        lastName: familyName,
        role: role,
        provider: 'google',
      });
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '1m' },
    );

    const refreshToken = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' },
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
});

// @desc Login
// @route POST /api/auth/login
// @access Public - login the user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const validate = ajv.compile(loginSchema);
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).json({ message: validate.errors });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({ message: 'The email or password is incorrect' });
    return;
  }

  if (user.provider === 'google') {
    res.status(401).json({
      message: 'This email is registered with Google. Please login with Google',
    });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    res.status(401).json({ message: 'The email or password is incorrect' });
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
    { expiresIn: '10s' },
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

  res.status(200).json({ accessToken });
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
