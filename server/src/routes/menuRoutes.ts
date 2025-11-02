import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/menuController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.route('/').get(protect, getAll).post(protect, create);
router.route('/:id').get(protect, getOne).put(protect, update).delete(protect, remove);

export default router;
