import { Router } from 'express';

const agendaRouter = Router();

agendaRouter.get('/', (req, res) => {
  // Listar agendamentos do usuário logado
});

agendaRouter.post('/', (req, res) => {
  // Criar nova reserva
});

agendaRouter.delete('/:id', (req, res) => {
  // Cancelar agendamento
});

export default agendaRouter;
