import { z } from 'zod';

const passwordValidationSchema = z
  .string({
    invalid_type_error: 'Password must be string*',
    required_error: 'Password is required*',
  })
  .min(8, 'Password must be at least 8 characters long')
  .max(16, 'Password should not be longer than 14 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  );

const emailValidationSchema = z
  .string({
    required_error: 'Email is required*',
    invalid_type_error: 'Email must be string*',
  })
  .email({ message: 'Invalid email address !' });

const createUserValidationSchema = z.object({
  name: z.string(),
  email: emailValidationSchema,
  phone: z.string(),
  password: passwordValidationSchema,
  role: z.enum(['user', 'admin']),
  address: z.string(),
});

export const userValidations = {
  createUserValidationSchema,
};
