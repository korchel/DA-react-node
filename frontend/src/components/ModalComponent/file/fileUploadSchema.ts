import { z, ZodType } from 'zod';

export interface IFileForm {
  file: File;
  params: {
    available_for: number[];
    public_file: boolean;
  };
}

export const fileUploadSchema: ZodType<IFileForm> = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'image/jpeg',
          'image/png',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ].includes(file.type),
      { message: 'errorMessages.wrongFileType' },
    )
    .refine((file) => file.size <= 10000000, {
      message: 'errorMessages.wrongFileSize',
    }),
  params: z.object({
    available_for: z.array(z.number()),
    public_file: z.boolean(),
  }),
});
