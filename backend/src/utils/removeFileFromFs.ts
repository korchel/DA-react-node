import * as fs from "fs";
import { IFile } from "../interfaces/files";

export const removeFileFromFs = (filepath: string) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      throw new Error("Failed to delete file");
    }
  });
};
