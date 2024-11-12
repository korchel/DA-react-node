import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { usersRouter } from "./routes/usersRouter";
import { documentsRouter } from "./routes/documentsRouter";
import { authRouter } from "./routes/authRouter";
import { filesRouter } from "./routes/filesRouter";
import { isAuthenticated } from "./middleWare/isAuthenticated";

export const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.URL,
  })
);
app.use(cookieParser());

app.use("/api/documents", isAuthenticated, documentsRouter);
app.use("/api/files", isAuthenticated, filesRouter);
app.use("/api/users", isAuthenticated, usersRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send(`Hello, Docker from ${process.env.NODE_ENV} server!`);
});
