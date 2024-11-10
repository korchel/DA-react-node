CREATE TABLE IF NOT EXISTS roles
  (id SERIAL PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL);

INSERT INTO roles (role_name)
  VALUES ('ROLE_USER'), ('ROLE_MODERATOR'), ('ROLE_ADMIN');

CREATE TABLE IF NOT EXISTS document_types
  (id SERIAL PRIMARY KEY,
  type_name TEXT UNIQUE NOT NULL);

INSERT INTO document_types (type_name)
  VALUES ('NOTE'), ('REPORT'), ('PRESENTATION'), ('ARTICLE');

CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT,
  password TEXT,
  FOREIGN KEY (role) REFERENCES roles (role_name));

CREATE TABLE IF NOT EXISTS documents
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
  FOREIGN KEY (author_id) REFERENCES users (id),
  FOREIGN KEY (type) REFERENCES document_types (type_name));

CREATE TABLE IF NOT EXISTS files
  (id SERIAL PRIMARY KEY,
  filename TEXT,
  filetype TEXT,
  author_id INTEGER,
  content TEXT,
  available_for INTEGER[],
  public_file BOOLEAN,
  creation_date TIMESTAMP NOT NULL,
  update_date TIMESTAMP NOT NULL,
  filepath TEXT,
  thumbnail_path TEXT,
  FOREIGN KEY (author_id) REFERENCES users (id));
