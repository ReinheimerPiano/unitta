import { Router } from 'express';
import { getAllReservas, getReservaById, createReserva } from '../controllers/reserva.controller';

const router = Router();

router.get('/', getAllReservas);
router.get('/:id', getReservaById);
router.post('/', createReserva);

export default router;
