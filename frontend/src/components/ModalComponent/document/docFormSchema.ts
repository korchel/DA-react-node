import { z, ZodType } from 'zod';

export interface IDocForm {
  title: string;
  number: number;
  content: string;
  type: string;
  available_for?: number[] | undefined;
  public_document: boolean;
}

export const createDocFormSchema: ZodType<IDocForm> = z.object({
  title: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(2, { message: 'Не менее 2 символов' })
    .max(50, { message: 'Не более 50 символов' }),
  number: z.coerce.number().positive({
    message: 'Обязательное поле',
  }),
  content: z.string().trim().min(1, { message: 'Обязательное поле' }),
  type: z.string({
    required_error: 'Обязательное поле',
  }),
  available_for: z.array(z.number()).optional(),
  public_document: z.boolean(),
});

export const editDocFormSchema: ZodType<IDocForm> = z.object({
  title: z
    .string({
      required_error: 'Обязательное поле',
    })
    .min(2, { message: 'Не менее 2 символов' })
    .max(50, { message: 'Не более 50 символов' }),
  number: z.coerce.number().positive({
    message: 'Обязательное поле',
  }),
  content: z.string().trim().min(1, { message: 'Обязательное поле' }),
  type: z.string({
    required_error: 'Обязательное поле',
  }),
  available_for: z.array(z.number()).optional(),
  public_document: z.boolean(),
});

export interface IDocTypeSelectOption {
  label: string;
  value: string;
}