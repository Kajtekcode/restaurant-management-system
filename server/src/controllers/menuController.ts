import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const menuItem = await prisma.menuItem.findUnique({ where: { id: parseInt(id) } });
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name, description, price, category, available } = req.body;
  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        category,
        available,
      },
    });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category, available } = req.body;
  try {
    const menuItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        category,
        available,
      },
    });
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.menuItem.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
