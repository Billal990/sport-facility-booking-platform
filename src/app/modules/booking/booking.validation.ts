import { z } from 'zod';

const createBookingValidationSchema = z.object({
  facility: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
