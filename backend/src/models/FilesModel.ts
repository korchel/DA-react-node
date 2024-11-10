import { Pool } from "pg";
import { IFile, IFileInputModel, IFileViewModel } from "../interfaces/files";

interface IFilesModel {
  findAll(currentUserId: number): Promise<IFileViewModel[]>;
  findById(id: number, currentUserId: number): Promise<IFileViewModel | null>;
  findFileNameById(
    id: number,
    currentUserId: number,
    thumbnail_path: string,
  ): Promise<{ filename: string; filetype: string } | null>;
  removeById(currentUserId: number, id: number): Promise<IFile | null>;
  update(
    currentUserId: number,
    id: number,
    data: IFileInputModel
  ): Promise<boolean>;
  create(
    userId: number,
    filepath: string,
    filename: string,
    mimetype: string,
    available_for: string,
    public_file: string,
    thumbnail_path: string,
  ): Promise<IFile>;
}

export class FilesModel implements IFilesModel {
  private database: Pool;
  constructor(db: Pool) {
    this.database = db;
  }

  async findAll(currentUserId: number): Promise<IFileViewModel[]> {
    const data = await this.database.query(`SELECT * FROM files
      WHERE ${currentUserId}=ANY(available_for)
      OR public_file = true OR author_id = ${currentUserId}`);
    const filesView = await Promise.all(
      data.rows.map(async (file) => {
        const author_id = file.author_id;
        const authorData = await this.database.query(
          "SELECT * FROM users where id = $1",
          [author_id]
        );
        const username = authorData.rows[0].username;
        const {
          id,
          filename,
          filetype,
          available_for,
          public_file,
          creation_date,
          update_date,
        } = file;
        const viewFileName = filename.substring(0, filename.lastIndexOf("-"));
        return {
          id,
          filename: viewFileName,
          filetype,
          author: username,
          available_for,
          public_file,
          creation_date,
          update_date,
        };
      })
    );
    return filesView;
  }

  async findAllForAdmin(): Promise<IFileViewModel[]> {
    const data = await this.database.query("SELECT * FROM files");
    const filesView = await Promise.all(
      data.rows.map(async (file) => {
        const author_id = file.author_id;
        const authorData = await this.database.query(
          "SELECT * FROM users where id = $1",
          [author_id]
        );
        const username = authorData.rows[0].username;
        const {
          id,
          filename,
          filetype,
          available_for,
          public_file,
          creation_date,
          update_date,
        } = file;
        const viewFileName = filename.substring(filename.indexOf("-") + 1);
        return {
          id,
          filename: viewFileName,
          filetype,
          author: username,
          available_for,
          public_file,
          creation_date,
          update_date,
        };
      })
    );
    return filesView;
  }

  async findFileNameById(
    id: number,
    currentUserId: number
  ): Promise<{ filename: string; filetype: string, thumbnail_path: string } | null> {
    const data = await this.database.query(
      `SELECT * FROM files WHERE id = $1
        AND (${currentUserId} = ANY(available_for) OR public_file = true OR author_id = ${currentUserId})`,
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedFile = data.rows[0];
    const { filename, filetype, thumbnail_path } = requestedFile;
    return { filename, filetype, thumbnail_path };
  }

  async findById(
    id: number,
    currentUserId: number
  ): Promise<IFileViewModel | null> {
    const data = await this.database.query(
      `SELECT * FROM files WHERE id = $1
        AND (${currentUserId} = ANY(available_for) OR public_file = true OR author_id = ${currentUserId})`,
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedFile = data.rows[0];
    const { author_id } = requestedFile;
    const authorData = await this.database.query(
      "SELECT * FROM users where id = $1",
      [author_id]
    );
    const username = authorData.rows[0].username;
    const {
      filename,
      filetype,
      available_for,
      public_file,
      creation_date,
      update_date,
    } = requestedFile;
    const viewFileName = filename.substring(filename.indexOf("-"));
    const fileView = {
      id,
      filename: viewFileName,
      filetype,
      author: username,
      available_for,
      public_file,
      creation_date,
      update_date,
    };
    return fileView;
  }

  async removeById(currentUserId: number, id: number): Promise<IFile | null> {
    const fileData = await this.database.query(
      "SELECT * FROM files WHERE id = $1",
      [id]
    );
    const file = fileData.rows[0];
    const deletedData = await this.database.query(
      `DELETE FROM files WHERE id = $1 AND author_id = ${currentUserId}`,
      [id]
    );
    if (deletedData.rowCount) {
      return file;
    }
    return null;
  }

  async create(
    userId: number,
    filepath: string,
    public_file: string,
    filename: string,
    mimetype: string,
    available_for: string,
    thumbnail_path: string,
  ): Promise<IFile> {
    const creation_date = new Date().toISOString();
    const update_date = new Date().toISOString();
    const createdFile = await this.database.query(
      `INSERT INTO files
      (filename, filetype, author_id, available_for, public_file, creation_date, update_date, filepath, thumbnail_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        filename,
        mimetype,
        userId,
        available_for,
        public_file,
        creation_date,
        update_date,
        filepath,
        thumbnail_path,
      ]
    );
    return createdFile.rows[0];
  }

  async update(currentUserId: number, id: number, data: IFileInputModel) {
    const { available_for, public_file } = data;
    const update_date = new Date().toISOString();
    const wasUpdated = await this.database.query(
      `UPDATE files
      SET available_for = $1, public_file = $2, update_date = $3
      WHERE id = $4  AND author_id = ${currentUserId}`,
      [available_for, public_file, update_date, id]
    );
    return !!wasUpdated;
  }
}
