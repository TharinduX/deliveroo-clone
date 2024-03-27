import { Request, Response } from 'express';
import User from '@models/user.model.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    console.error(error); // This will log the error in your server console.
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
