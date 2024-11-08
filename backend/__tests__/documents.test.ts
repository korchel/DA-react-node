import request from "supertest";
import { app } from "../src/app";

import { callBeforeAll } from "./common.test";

callBeforeAll();

describe("/documents", () => {
  it("returns 401 on unauthorized request for all documents", async () => {
    await request(app).get("/api/documents").expect(401);
  }, 100000);

  it("returns 401 on unauthorized request for one document", async () => {
    await request(app).get("/api/documents/1").expect(401);
  }, 100000);

  it("returns 200 on request for all documents by an authorized user", async () => {
    await request(app).post("/api/auth/sign-up").send({
      name: "john test",
      lastname: "doe test",
      username: "johnny test 2",
      email: "test@mail.com",
      password: "password",
      passwordConfirm: "password", // remove??
    });
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app).get("/api/documents").set("Cookie", cookies).expect(200);
  }, 100000);

  it("returns only public or available for the user documents on request for all documents by an authorized user", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .get("/api/documents")
      .set("Cookie", cookies)
      .expect(200)
      .then((res) => {
        const recievedData = res.body;
        expect(recievedData.length).toBe(1);
      });
  }, 100000);

  it("returns 200 on request for one public document by an authorized user", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .get("/api/documents/2")
      .set("Cookie", cookies)
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("document 2 test");
      });
  }, 100000);

  it("returns 403 on request for non-public document", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .get("/api/documents/1")
      .set("Cookie", cookies)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("Not allowed for user johnny test 2");
      });
  }, 100000);

  it("returns 201 on request to post document", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .post("/api/documents")
      .set("Cookie", cookies)
      .send({
        title: "document 3 test",
        number: 1,
        type_id: 1,
        content: "content",
        public_document: false,
        available_for: [3],
      })
      .expect(201)
      .then((res) => {
        expect(res.body.title).toBe("document 3 test");
      });
  }, 100000);

  it("returns 200 on request to update document by the author", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .put("/api/documents/3")
      .set("Cookie", cookies)
      .send({
        title: "document 3 test updated",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.title).toBe("document 3 test updated");
      });
  }, 100000);

  it("returns 403 on attempt to update someone else's document", async () => {
    let cookies: string[] | undefined = [];
    await request(app)
      .post("/api/auth/sign-in")
      .send({
        username: "johnny test 2",
        password: "password",
      })
      .then((res) => {
        cookies = res.get("Set-Cookie");
      });

    await request(app)
      .put("/api/documents/1")
      .set("Cookie", cookies)
      .send({
        title: "document 3 test updated",
      })
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("You are not the author");
      });
  });
});
