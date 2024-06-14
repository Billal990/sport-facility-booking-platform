import { z } from 'zod';

const customStartTimeValidationSchema = z.string().refine(
  time => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  { message: 'Start time format is not valid! Format should be like - HH:MM' },
);

const customEndTimeValidationSchema = z.string().refine(
  time => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  { message: 'End time format is not valid! Format should be like - HH:MM' },
);

const createBookingValidationSchema = z
  .object({
    facility: z.string(),
    date: z.string(),
    startTime: customStartTimeValidationSchema,
    endTime: customEndTimeValidationSchema,
  })
  .refine(
    data => {
      const startTime = new Date(`1970-01-01T${data.startTime}`).getTime();
      const endTime = new Date(`1970-01-01T${data.endTime}`).getTime();
      return startTime < endTime;
    },
    { message: 'Start time slot must be less than end time slot !' },
  );

export const bookingValidations = {
  createBookingValidationSchema,
};
