import { Router } from 'express';
import {
  getAllSalas,
  createSala,
  updateSala,
  toggleSalaStatus,
} from '../controllers/sala.controller';

const router = Router();

router.get('/', getAllSalas);
router.post('/', createSala);
router.put('/:id', updateSala);
router.patch('/:id/ativa', toggleSalaStatus);

export default router;
