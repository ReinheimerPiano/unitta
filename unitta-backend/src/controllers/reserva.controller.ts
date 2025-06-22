import { Request, Response } from 'express';
import {
  findAllReservas,
  findReservaById,
  createReservaService
} from '../services/reserva.service';

export async function getAllReservas(req: Request, res: Response) {
  const reservas = await findAllReservas();
  res.json(reservas);
}

export async function getReservaById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const reserva = await findReservaById(id);
    res.json(reserva);
  } catch (error: any) {
    res.status(404).json({ message: 'Reserva não encontrada' })
  }
}

export async function createReserva(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { salaId, inicio, fim } = req.body;

  try {
    const reserva = await createReservaService({ userId, salaId, inicio, fim });
    res.status(201).json(reserva);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
