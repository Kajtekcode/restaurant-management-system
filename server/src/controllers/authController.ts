import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({ message: 'Logged out successfully' });
};

export const getMe = (req: Request, res: Response) => {
  if (req.user) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};
