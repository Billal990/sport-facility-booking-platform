import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  pricePerHour: z.number({
    invalid_type_error: 'Price must be number*',
  }),
  location: z.string(),
});

const updateFacilityValidationSchema = createFacilityValidationSchema.partial();

export const facilityValidations = {
    createFacilityValidationSchema,
    updateFacilityValidationSchema
}