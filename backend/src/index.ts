import { app } from "./app";
import { setUpDataBase } from "./db/db";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(
    `API of ${process.env.NODE_ENV} listening at http://localhost:${PORT}`
  )
);

setUpDataBase();
