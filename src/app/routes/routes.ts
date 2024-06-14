import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { bookingRoutes } from '../modules/booking/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/facilities',
    route: facilityRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
