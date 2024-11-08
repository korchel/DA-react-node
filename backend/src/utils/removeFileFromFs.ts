import * as fs from 'fs';
import { IFile } from '../interfaces/files';

export const removeFileFromFs = (file: IFile) => {
  fs.unlink(file.filepath, (err) => {
    if (err) {
      console.error(err);
      throw new Error("Failed to delete file");
    }
  });
};