import { Router } from 'express';

const creditRouter = Router();

creditRouter.get('/', (req, res) => {
  // Ver créditos do usuário logado
});

creditRouter.post('/purchase', (req, res) => {
  // Criar pedido de compra de créditos
});

creditRouter.post('/confirm', (req, res) => {
  // Confirmar pagamento (ex: via webhook ou callback de gateway)
});

export default creditRouter;
