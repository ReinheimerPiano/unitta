import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function auth(req: Request, res: Response, next: NextFunction): void  {
  const authHeader = req.headers.authorization;
  if (!authHeader) { res.status(401).json({ message: 'Token ausente' }); return;};

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user.role !== 'ADMIN'){
    res.status(403).json({ message: 'Acesso negado' });
    return
  }
  next();
}
