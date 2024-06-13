import { Router } from 'express';
import { userControllers } from './user.controller';
import { studentValidations } from '../student/studentValidation';
import { validateRequest } from '../../utils/validateRequest';
import { facultyValidations } from './../faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.studentCreateValidationSchema),
  auth(USER_ROLE.admin),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(adminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const userRoutes = router;
