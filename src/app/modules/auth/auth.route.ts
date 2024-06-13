import { Router } from 'express';
import { validateRequest } from '../../utils/validateRequest';
import { authValidations } from './auth.validation';
import { authContollers } from './auth.controller';
import { USER_ROLE } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidations.loginUserValidationSchema),
  authContollers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidations.passwordValidationSchema),
  authContollers.changePassword,
);

export const authRoutes = router;
