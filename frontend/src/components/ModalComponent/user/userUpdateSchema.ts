import { z, ZodType } from 'zod';

export interface IEditUserForm {
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: string;
}

export const userUpdateSchema: ZodType<IEditUserForm> = z.object({
  username: z.string().trim().min(1, {
    message: 'errorMessages.required',
  }),
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'errorMessages.required',
    })
    .email({ message: 'errorMessages.inValidEmail' }),
  name: z.string().trim().min(1, {
    message: 'errorMessages.required',
  }),
  lastname: z.string().trim().min(1, {
    message: 'errorMessages.required',
  }),
  role: z.string().trim().min(1, {
    message: 'errorMessages.required',
  }),
});
