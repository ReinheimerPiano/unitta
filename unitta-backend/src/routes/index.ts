import { Router } from 'express';
import authRoutes from './auth.routes';
import agendaRoutes from './agenda.routes';
import creditRoutes from './credit.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/agenda', agendaRoutes);
router.use('/credits', creditRoutes);

export default router;
