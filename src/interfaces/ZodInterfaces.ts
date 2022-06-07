import { z } from 'zod';

export const IdZodSchema = z.object({
  id: z.string({
    required_error: 'Id is required',
    invalid_type_error: 'Id must be a string',
  }).length(24, { message: 'Id must have 24 hexadecimal characters' }),
});

type ID = z.infer<typeof IdZodSchema>;

export default ID;