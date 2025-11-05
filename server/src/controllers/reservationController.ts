import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReservation = async (req: Request, res: Response) => {
  const { name, phone, email, guests, date, table, status } = req.body;
  try {
    const reservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        email,
        guests,
        date: new Date(date),
        table,
        status,
      },
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  const { date } = req.query;
  const where = date ? { date: { gte: new Date(date as string), lt: new Date(new Date(date as string).setDate(new Date(date as string).getDate() + 1)) } } : {};
  try {
    const reservations = await prisma.reservation.findMany({ where, orderBy: { date: 'asc' } });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const reservation = await prisma.reservation.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reservation = await prisma.reservation.update({
      where: { id: parseInt(id) },
      data: { status: 'canceled' },
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.reservation.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
