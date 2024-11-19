import { Pool } from "pg";
import { IFile, IFileInputModel } from "../interfaces/files";

interface IFilesModel {
  findAllForUser(currentUserId: number): Promise<IFile[]>;
  findAll(): Promise<IFile[]>;
  findByIdForUser(id: number, currentUserId: number): Promise<IFile | null>;
  findById(id: number): Promise<IFile | null>;
  removeByIdForUser(currentUserId: number, id: number): Promise<IFile | null>;
  removeById(id: number): Promise<IFile | null>;
  updateForUser(
    currentUserId: number,
    id: number,
    data: IFile
  ): Promise<boolean>;
  update(id: number, data: IFileInputModel): Promise<boolean>;
  create(
    userId: number,
    filepath: string,
    filename: string,
    mimetype: string,
    available_for: string,
    public_file: string,
    thumbnail_path: string,
    filetype: string
  ): Promise<IFile>;
}

export class FilesModel implements IFilesModel {
  private database: Pool;
  constructor(db: Pool) {
    this.database = db;
  }

  async findAllForUser(currentUserId: number): Promise<IFile[]> {
    const data = await this.database.query(`SELECT * FROM files
      WHERE ${currentUserId}=ANY(available_for)
      OR public_file = true OR author_id = ${currentUserId}`);
    const requestedFiles = data.rows;
    return requestedFiles;
  }

  async findAll(): Promise<IFile[]> {
    const data = await this.database.query("SELECT * FROM files");
    const requestedFiles = data.rows;
    return requestedFiles;
  }

  async findByIdForUser(
    id: number,
    currentUserId: number
  ): Promise<IFile | null> {
    const data = await this.database.query(
      `SELECT * FROM files WHERE id = $1
        AND (${currentUserId} = ANY(available_for) OR public_file = true OR author_id = ${currentUserId})`,
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedFile = data.rows[0];

    return requestedFile;
  }

  async findById(id: number): Promise<IFile | null> {
    const data = await this.database.query(
      `SELECT * FROM files WHERE id = $1`,
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedFile = data.rows[0];
    return requestedFile;
  }

  async removeByIdForUser(
    currentUserId: number,
    id: number
  ): Promise<IFile | null> {
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

  async removeById(id: number): Promise<IFile | null> {
    const fileData = await this.database.query(
      "SELECT * FROM files WHERE id = $1",
      [id]
    );
    const file = fileData.rows[0];
    const deletedData = await this.database.query(
      `DELETE FROM files WHERE id = $1`,
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
    filetype: string
  ): Promise<IFile> {
    const creation_date = new Date().toISOString();
    const update_date = new Date().toISOString();
    const createdFile = await this.database.query(
      `INSERT INTO files
      (filename, mimetype, author_id, available_for, public_file, creation_date, update_date, filepath, thumbnail_path, filetype)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
        filetype,
      ]
    );
    return createdFile.rows[0];
  }

  async updateForUser(
    currentUserId: number,
    id: number,
    data: IFileInputModel
  ) {
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

  async update(id: number, data: IFileInputModel) {
    const { available_for, public_file } = data;
    const update_date = new Date().toISOString();
    const wasUpdated = await this.database.query(
      `UPDATE files
      SET available_for = $1, public_file = $2, update_date = $3
      WHERE id = $4`,
      [available_for, public_file, update_date, id]
    );
    return !!wasUpdated;
  }
}
