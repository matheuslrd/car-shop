import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'doorQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).min(2).max(4),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).min(2).max(7),
});

export type Car = z.infer<typeof CarSchema>;
