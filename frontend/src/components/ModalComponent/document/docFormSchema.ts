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
      required_error: 'errorMessages.required',
    })
    .min(2, { message: 'errorMessages.docTitleLength' })
    .max(50, { message: 'errorMessages.docTitleLength' }),
  number: z.coerce.number().positive({
    message: 'errorMessages.required',
  }),
  content: z.string().trim().min(1, { message: 'errorMessages.required' }),
  type: z.string({
    required_error: 'errorMessages.required',
  }),
  available_for: z.array(z.number()).optional(),
  public_document: z.boolean(),
});

export const editDocFormSchema: ZodType<IDocForm> = z.object({
  title: z
    .string({
      required_error: 'errorMessages.required',
    })
    .min(2, { message: 'errorMessages.docTitleLength' })
    .max(50, { message: 'errorMessages.docTitleLength' }),
  number: z.coerce.number().positive({
    message: 'errorMessages.required',
  }),
  content: z.string().trim().min(1, { message: 'errorMessages.required' }),
  type: z.string({
    required_error: 'errorMessages.required',
  }),
  available_for: z.array(z.number()).optional(),
  public_document: z.boolean(),
});

export interface IDocTypeSelectOption {
  label: string;
  value: string;
}
