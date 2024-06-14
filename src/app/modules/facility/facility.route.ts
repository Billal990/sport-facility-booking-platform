import { Router } from 'express';
import { validateRequest } from '../../utils/validateRequest';
import { facilityValidations } from './facility.validation';
import { facilityControllers } from './facility.controller';

const router = Router();

router.post(
  '/',
  validateRequest(facilityValidations.createFacilityValidationSchema),
  facilityControllers.createFacility,
);

router.get('/', facilityControllers.getAllFacilities);

router.get('/:id', facilityControllers.getSingleFacility);

router.delete('/:id', facilityControllers.deleteFacility);

router.patch(
  '/:id',
  validateRequest(facilityValidations.updateFacilityValidationSchema),
  facilityControllers.updateFacility,
);

export const facilityRoutes = router;
