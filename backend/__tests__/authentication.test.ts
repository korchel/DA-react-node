import request from "supertest";
import { app } from "../src/app";
import { callBeforeAll } from "./common.test";

callBeforeAll();

describe("/auth", () => {
  it("returns 403 on successful sign in", async () => {
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("Wrong username or password");
      });
  }, 100000);

  it("returns 201 on successful sign up", async () => {
    await request(app)
      .post("/api/auth/sign-up")
      .send({
        name: "john",
        lastname: "doe",
        username: "johnny test",
        email: "test@mail.com",
        password: "password",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.message).toBe('User johnny test has been created!');
      });
  }, 100000);

  it("returns 200 on successful sign in", async () => {
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('Hello, johnny test!');
      });
  }, 100000);

   it("returns 400 on successful sign up", async () => {
    await request(app)
      .post("/api/auth/sign-up")
      .send({
        name: "john",
        lastname: "doe",
        username: "johnny test",
        email: "another@mail.com",
        password: "password",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('User name or email are already registered');
      });
  }, 100000);
});
