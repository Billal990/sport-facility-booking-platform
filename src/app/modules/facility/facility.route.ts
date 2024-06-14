import { Router } from 'express';
import { validateRequest } from '../../utils/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(facilityValidations.createFacilityValidationSchema),
  facilityControllers.createFacility,
);

router.get('/', facilityControllers.getAllFacilities);

router.get('/:id', facilityControllers.getSingleFacility);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  facilityControllers.deleteFacility,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(facilityValidations.updateFacilityValidationSchema),
  facilityControllers.updateFacility,
);

export const facilityRoutes = router;
