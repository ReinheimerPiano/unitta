import { Request, Response } from 'express';
import {
  findAllUsers,
  findUserById,
  createUserService,
  updateUserStatusService,
  deleteUserService,
} from '../services/user.service';

export async function getAllUsers(req: Request, res: Response) {
  const users = await findAllUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
   try {
    const user = await findUserById(id);
    res.json(user);
   } catch (error: any) {
    res.status(404).json({ message: 'Usuário não encontrado' });
   }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateUserStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await updateUserStatusService(id, status);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
