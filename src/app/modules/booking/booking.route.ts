import { Router } from 'express';
import { validateRequest } from '../../utils/validateRequest';
import { bookingValidations } from './booking.validation';
import { bookingControllers } from './booking.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), bookingControllers.getAllBookings);

router.get('/:user', auth(USER_ROLE.user), bookingControllers.getBookingsByUser);

router.delete('/:id',auth(USER_ROLE.user), bookingControllers.cancelBooking);

export const bookingRoutes = router;
