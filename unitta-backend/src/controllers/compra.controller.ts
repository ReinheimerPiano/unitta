import { Request, Response } from 'express';
import {
  findAllCompras,
  findCompraById,
  createCompraService
} from '../services/compra.service';

export async function getAllCompras(req: Request, res: Response) {
  const compras = await findAllCompras();
  res.json(compras);
}

export async function getCompraById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const compra = await findCompraById(id);
    if (!compra) {
      res.status(404).json({ message: 'Compra não encontrada' });
      return
    }
    res.json(compra);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erro interno do servidor' });
  }
}

export async function createCompra(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { pacoteId } = req.body;

  try {
    const compra = await createCompraService(userId, pacoteId);
    res.status(201).json(compra);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
