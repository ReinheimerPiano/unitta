import { Router } from 'express';
import authRoutes from './auth.routes';
import agendaRoutes from './agenda.routes';
import creditRoutes from './credit.routes';
import packageRoutes from './pacote.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/agenda', agendaRoutes);
router.use('/credits', creditRoutes);
router.use('/package', packageRoutes);

export default router;
