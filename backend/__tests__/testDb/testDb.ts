import { Pool } from "pg";
import bcrypt from "bcrypt";
import { db } from "../../src/db/db";
import {
  createDocumentsTableQuery,
  createUsersTableQuery,
  createUserQuery,
  createDocumentQuery,
} from "./queries";

export const setUpDataBase = async () => {
  try {
    const client = await db.connect();

    await client.query(createUsersTableQuery());
    await client.query(createDocumentsTableQuery());

    client.release();
    console.log("TEMPORARY TABLES ARE READY");
  } catch (error) {
    console.log("ERROR WHILE CREATING TEMPORARY TABLES: " + error);
  }

  try {
    const client = await db.connect();

    const moderPassword = await bcrypt.hash("password", 10);
    await client.query(createUserQuery(), [
      "moder test",
      "Peter",
      "Doe",
      "peter@email.com",
      '{"ROLE_MODERATOR"}',
      moderPassword,
    ]);
    const adminPassword = await bcrypt.hash("password", 1);
    await client.query(createUserQuery(), [
      "admin test",
      "John",
      "Doe",
      "john@email.com",
      '{"ROLE_ADMIN"}',
      adminPassword,
    ]);
    client.release();
    console.log("ADMIN AND MODER ADDED");
  } catch (error) {
    console.log("ERROR WHILE CREATING ADMIN AND MODER: " + error);
  }

  try {
    const client = await db.connect();

    await client.query(createDocumentQuery(), [
      "document 1 test",
      1,
      1,
      "content",
      "NOTE",
      [2],
      false,
      new Date().toISOString(),
      new Date().toISOString(),
    ]);

    await client.query(createDocumentQuery(), [
      "document 2 test",
      1,
      1,
      "content",
      "NOTE",
      [],
      true,
      new Date().toISOString(),
      new Date().toISOString(),
    ]);

    client.release();
    console.log("TEMPORARY DOCUMENTS ADDED");
  } catch (error) {
    console.log("ERROR WHILE CREATING DOCUMENTS: " + error);
  }
};
