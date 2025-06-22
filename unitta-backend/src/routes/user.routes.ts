import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserStatus,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);

export default router;
