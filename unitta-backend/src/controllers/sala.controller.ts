import { Request, Response } from 'express';
import {
  findAllSalas,
  createSalaService,
  updateSalaService,
  toggleSalaAtivaService
} from '../services/sala.service';

export async function getAllSalas(req: Request, res: Response) {
  const salas = await findAllSalas();
  res.json(salas);
}

export async function createSala(req: Request, res: Response) {
  try {
    const sala = await createSalaService(req.body);
    res.status(201).json(sala);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateSala(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const sala = await updateSalaService(id, req.body);
    res.json(sala);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function toggleSalaStatus(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const sala = await toggleSalaAtivaService(id);
    res.json(sala);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
