import { Router } from 'express';
import {
  getAllPacotes,
  createPacote,
  updatePacote,
  deletePacote,
} from '../controllers/pacote.controller';
import { auth, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', auth, getAllPacotes);
router.post('/', auth, isAdmin, createPacote);
router.put('/:id', auth, isAdmin, updatePacote);
router.delete('/:id', auth, isAdmin, deletePacote);

export default router;
