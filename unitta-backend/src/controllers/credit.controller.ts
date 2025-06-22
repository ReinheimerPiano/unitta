import { Request, Response } from 'express';
import {
  getUserCreditsService,
  addCreditsToUserService
} from '../services/credit.service';

export async function getMyCredits(req: Request, res: Response) {
  const userId = (req as any).user.id;

  try {
    const credits = await getUserCreditsService(userId);
    res.json({ credits });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

export async function addCredits(req: Request, res: Response) {
  const { userId, credits } = req.body;

  if (!userId || typeof credits !== 'number') {
    res.status(400).json({ message: 'Parâmetros inválidos' });
    return
  }

  try {
    const user = await addCreditsToUserService(userId, credits);
    res.json({
      message: 'Créditos adicionados com sucesso',
      user
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

