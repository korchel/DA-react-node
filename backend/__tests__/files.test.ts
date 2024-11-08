import request from "supertest";
import { app } from "../src/app";

import { callBeforeAll } from "./common.test";

callBeforeAll();

describe("/files", () => {
  it("returns 401 on unauthorized request for all documents", async () => {
    await request(app).get("/api/files").expect(401);
  }, 100000);

  it("returns 401 on unauthorized request for one document", async () => {
    await request(app).get("/api/files/1").expect(401);
  }, 100000);
});
