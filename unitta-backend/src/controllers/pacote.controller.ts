import { Request, Response } from 'express';
import {
  findAllPacotes,
  createPacoteService,
  updatePacoteService,
  deletePacoteService
} from '../services/pacote.service';

export async function getAllPacotes(req: Request, res: Response) {
  const pacotes = await findAllPacotes();
  res.json(pacotes);
}

export async function createPacote(req: Request, res: Response) {
  try {
    const pacote = await createPacoteService(req.body);
    res.status(201).json(pacote);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updatePacote(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const pacote = await updatePacoteService(id, req.body);
    res.json(pacote);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function deletePacote(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deletePacoteService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
