import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { checkAvailabilityRoute } from '../modules/slots/slot.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/facility',
    route: facilityRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/check-availability',
    route: checkAvailabilityRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
