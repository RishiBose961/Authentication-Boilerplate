import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../src/app.js";
import {
  connectMemoryDB,
  disconnectMemoryDB,
  clearDB,
} from "../setup/memory-server.js";

beforeAll(connectMemoryDB);
afterAll(disconnectMemoryDB);
beforeEach(clearDB);

describe("Login API", () => {
  const signupEndpoint = "/api/users/signup";
  const loginEndpoint = "/api/users/login";
  const user = {
    email: "login@example.com",
    password: "testpassword",
  };

  it("should login an existing user", async () => {
    await request(app).post(signupEndpoint).send(user);

    const res = await request(app).post(loginEndpoint).send(user);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(user.email);
    expect(res.body._id).toBeDefined();
  });

//   it("should not login with incorrect password", async () => {
//     await request(app).post(signupEndpoint).send(user);

//     const res = await request(app).post(loginEndpoint).send({
//       email: user.email,
//       password: "wrongpass",
//     });

//     expect(res.status).toBe(500); // or 401 if implemented
//     expect(res.body.message).toBe("Error logging in");
//   });
});
