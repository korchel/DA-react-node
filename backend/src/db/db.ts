import { Pool } from "pg";
import bcrypt from "bcrypt";

export const db = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  database: process.env.DB_NAME || "da_postgres",
});

export const setUpDataBase = async () => {
  try {
    const client = await db.connect();
    const moderPassword = await bcrypt.hash("password", 10);
    await client.query(
      `INSERT INTO users
      (username, "name", lastname, email, role, "password")
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING;`,
      [
        "moder",
        "Peter",
        "Doe",
        "peter@email.com",
        "ROLE_MODERATOR",
        moderPassword,
      ]
    );
    const adminPassword = await bcrypt.hash("password", 10);
    await client.query(
      `INSERT INTO users
      (username, "name", lastname, email, role, "password")
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING;`,
      ["admin", "John", "Doe", "john@email.com", "ROLE_ADMIN", adminPassword]
    );
    client.release();
    console.log("DATABASE READY");
  } catch (error) {
    console.log("ERROR WHILE CREATING ADMIN AND MODER: " + error);
  }
};
