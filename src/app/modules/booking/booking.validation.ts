import { z } from 'zod';

const timeStringSchema = z.string().refine(
  time => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  { message: 'Invalid time format , expected "HH:MM" in 24 hours format'}
);


const createBookingValidationSchema = z
  .object({
    facility: z.string(),
    date: z.string(),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })

export const bookingValidations = {
  createBookingValidationSchema,
};
