import { Router } from 'express';
import { createReservation, getReservations, updateReservation, cancelReservation, deleteReservation } from '../controllers/reservationController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', protect, createReservation);
router.get('/', protect, getReservations);
router.put('/:id', protect, updateReservation);
router.patch('/:id/cancel', protect, cancelReservation);
router.delete('/:id', protect, deleteReservation);

export default router;
