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

describe("Register API", () => {
  const endpoint = "/api/users/signup";

  it("should register a new user", async () => {
    const res = await request(app).post(endpoint).send({
      email: "register@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("register@example.com");
    expect(res.body._id).toBeDefined();
  });
});
