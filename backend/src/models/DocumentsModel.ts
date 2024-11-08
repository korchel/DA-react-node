import { Pool } from "pg";
import { IDocumentInputModel, IDocumentViewModel } from "../interfaces";

const documentTypes: Record<string, string> = {
  "1": "NOTE",
  "2": "REPORT",
  "3": "PRESENTATION",
  "4": "ARTICLE",
  default: "NOTE",
};

interface IDocumentsModel {
  findAll(currentUserId: number): Promise<IDocumentViewModel[]>;
  findAllForAdmin(): Promise<IDocumentViewModel[]>;
  findById(
    id: number,
    currentUserId: number
  ): Promise<IDocumentViewModel | null>;
  removeById(currentUserId: number, id: number): Promise<boolean>;
  update(
    currentUserId: number,
    id: number,
    data: IDocumentInputModel
  ): Promise<IDocumentViewModel | null>;
  create(
    userId: number,
    data: IDocumentInputModel
  ): Promise<IDocumentViewModel>;
}

export class DocumentsModel implements IDocumentsModel {
  private database: Pool;

  constructor(db: Pool) {
    this.database = db;
  }

  async findAll(currentUserId: number): Promise<IDocumentViewModel[]> {
    const data = await this.database.query(`SELECT * FROM documents
        WHERE ${currentUserId}=ANY(available_for)
        OR  public_document = true OR author_id = ${currentUserId}`);

    const documentsView = await Promise.all(
      data.rows.map(async (doc) => {
        const author_id = doc.author_id;
        const authorData = await this.database.query(
          "SELECT * FROM users where id = $1",
          [author_id]
        );
        const username = authorData.rows[0].username;
        return {
          id: doc.id,
          title: doc.title,
          number: doc.number,
          author: username,
          type: doc.type,
          content: doc.content,
          creationDate: doc.creation_date,
          updateDate: doc.update_date,
          public_document: doc.public_document,
          available_for: doc.available_for,
        };
      })
    );
    return documentsView;
  }

  async findAllForAdmin(): Promise<IDocumentViewModel[]> {
    const data = await this.database.query("SELECT * FROM documents");
    const documentsView = await Promise.all(
      data.rows.map(async (doc) => {
        const author_id = doc.author_id;
        const authorData = await this.database.query(
          "SELECT * FROM users where id = $1",
          [author_id]
        );
        const username = authorData.rows[0].username;
        return {
          id: doc.id,
          title: doc.title,
          number: doc.number,
          author: username,
          type: doc.type,
          content: doc.content,
          creationDate: doc.creation_date,
          updateDate: doc.update_date,
          public_document: doc.public_document,
          available_for: doc.available_for,
        };
      })
    );
    return documentsView;
  }

  async findById(
    id: number,
    currentUserId: number
  ): Promise<IDocumentViewModel | null> {
    const data = await this.database.query(
      `SELECT * FROM documents WHERE id = $1
        AND (${currentUserId} = ANY(available_for) OR  public_document = true OR author_id = ${currentUserId})`,
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedDocument = data.rows[0];
    return requestedDocument;
  }

  async removeById(currentUserId: number, id: number): Promise<boolean> {
    const deletedData = await this.database.query(
      `DELETE FROM documents WHERE id = $1 AND author_id = ${currentUserId}`,
      [id]
    );
    return !!deletedData.rowCount;
  }

  async create(
    userId: number,
    data: IDocumentInputModel
  ): Promise<IDocumentViewModel> {
    const { title, number, type_id, content, public_document, available_for } =
      data;
    const type = documentTypes[type_id] || documentTypes.default;
    const creation_date = new Date().toISOString();
    const update_date = new Date().toISOString();
    const createdDocument = await this.database.query(
      `INSERT INTO documents
      (title, number, type, content, public_document, available_for, author_id, creation_date, update_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
      [
        title,
        number,
        type,
        content,
        public_document,
        available_for,
        userId,
        creation_date,
        update_date,
      ]
    );
    return createdDocument.rows[0];
  }

  async update(
    currentUserId: number,
    id: number,
    data: IDocumentInputModel
  ): Promise<IDocumentViewModel | null> {
    const { title, number, type_id, content, public_document, available_for } =
      data;
    const update_date = new Date().toISOString();
    const type = documentTypes[type_id] || documentTypes.default;
    const updatedDocumentData = await this.database.query(
      `UPDATE documents
        SET title = $1, number = $2, type = $3, content = $4, public_document = $5, available_for = $6, update_date = $7
        WHERE id = $8 AND author_id = ${currentUserId}
        RETURNING *`,
      [
        title,
        number,
        type,
        content,
        public_document,
        available_for,
        update_date,
        id,
      ]
    );
    if (updatedDocumentData.rows.length === 0) {
      return null;
    }
    const updatedDocument = updatedDocumentData.rows[0];

    return updatedDocument;
  }
}
