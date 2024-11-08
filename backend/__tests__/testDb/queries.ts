export const createUsersTableQuery =
  () => `CREATE TEMPORARY TABLE IF NOT EXISTS users 
  (id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    roles TEXT[],
    password TEXT);`;

export const createDocumentsTableQuery =
  () => `CREATE TEMPORARY TABLE IF NOT EXISTS documents
  (id SERIAL PRIMARY KEY,
    title TEXT,
    "number" INTEGER,
    author_id INTEGER, 
    content TEXT,
    type TEXT,
    available_for INTEGER[],
    public_document BOOLEAN,
    creation_date TIMESTAMP NOT NULL,
    update_date TIMESTAMP NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id));`;

export const createUserQuery = () => {
  return `INSERT INTO users
    (username, "name", lastname, email, roles, "password")
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT DO NOTHING;`;
};

export const createDocumentQuery = () => {
  return `INSERT INTO documents
    (title, "number", author_id, content, type, available_for, public_document, creation_date, update_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
};
