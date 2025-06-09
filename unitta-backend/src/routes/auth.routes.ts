import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  // Lógica de autenticação
});

authRouter.post('/register', (req, res) => {
  // Solicitação de cadastro (para aprovação posterior)
});

authRouter.post('/logout', (req, res) => {
  // Logout
});

export default authRouter;
