import { Router } from 'express';
import { validateRequest } from '../../utils/validateRequest';
import { userValidations } from '../user/user.validation';
import { userControllers } from '../user/user.controller';
import { authValidations } from './auth.validation';
import { authContollers } from './auth.controller';

const router = Router();

router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authContollers.login,
);

export const authRoutes = router;
