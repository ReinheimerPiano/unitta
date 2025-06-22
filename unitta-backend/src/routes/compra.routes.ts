import { Router } from 'express';
import {
  getAllCompras,
  getCompraById,
  createCompra
} from '../controllers/compra.controller';

const router = Router();

router.get('/', getAllCompras);
router.get('/:id', getCompraById);
router.post('/', createCompra);

export default router;
