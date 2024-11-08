import request from "supertest";
import { app } from "../src/app";
import { callBeforeAll } from "./common.test";
import { UsersModel } from "../src/models/UsersModel";
import { db } from "../src/db/db";
import { agent } from "superagent";

const usersModel = new UsersModel(db);

callBeforeAll();

describe("/users", () => {
  it("returns 401 on unauthorized request for all users", async () => {
    await request(app).get("/api/users").expect(401);
  }, 100000);

  it("returns 401 on unauthorized request for one user", async () => {
    await request(app).get("/api/users/1").expect(401);
  }, 100000);

  it("returns 200 and 3 users on request for all users by an authorized user", async () => {
    await request(app).post("/api/auth/sign-up").send({
      name: "john test",
      lastname: "doe test",
      username: "johnny test",
      email: "test@mail.com",
      password: "password",
      passwordConfirm: "password", //TODO remove from frontend
    });
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .get("/api/users")
      .set("Cookie", cookies)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(3);
      });
  }, 100000);

  it("returns 200 on request for one user by an authorized user", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .get("/api/users/1")
      .set("Cookie", cookies)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(1);
      });
  }, 100000);

  it("does not allow non-admin users to update their roles", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });
    await request(app)
      .put("/api/users/3")
      .set("Cookie", cookies)
      .send({
        username: "johnny test",
        email: "string",
        name: "string",
        lastname: "string",
        roles: ["ROLE_ADMIN"]
      })
      .expect(200)
      .then((res) => {
        expect(res.body.roles).toStrictEqual(["ROLE_USER"]);
      });

    
  }, 100000);

  it("allows admin update users' roles", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "admin test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .put("/api/users/3")
      .set("Cookie", cookies)
      .send({
        username: "johnny test",
        email: "string",
        name: "string",
        lastname: "string",
        roles: ["ROLE_MODERATOR"]
      })
      .expect(200)
      .then((res) => {
        expect(res.body.roles).toStrictEqual(["ROLE_MODERATOR"]);
      });
  })

  it("does not allow non-admin users to delete a user", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });
    await request(app)
      .delete("/api/users/3")
      .set("Cookie", cookies)
      .expect(401);
  }, 100000);

  it("allows admin to delete a user", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "admin test",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .delete("/api/users/3")
      .set("Cookie", cookies)
      .expect(204);
  }, 100000);
});
