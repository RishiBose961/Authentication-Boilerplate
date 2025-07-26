import { describe, it, expect, beforeAll,beforeEach, afterAll, afterEach } from 'vitest';
import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../src/app.js' // IMPORTANT: Export your express app from your main server file


const prisma = new PrismaClient();
const request = supertest(app);

// Define API endpoints for consistency
const registerEndpoint = '/api/users/signup';
const loginEndpoint = '/api/users/login';


describe('Auth API: /api/users', () => {
  // Test user credentials
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
  };

  // Clean the database before any tests run
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  // Clean up created users after each test to ensure test isolation
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  // Disconnect from Prisma after all tests are done
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Test suite for the POST /api/users/signup endpoint
  describe(`POST ${registerEndpoint}`, () => {
    it('should register a new user successfully and return 201', async () => {
      const response = await request
        .post(registerEndpoint)
        .send(testUser);

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(testUser.email);
      expect(response.body).not.toHaveProperty('password'); // Ensure password is not returned

      // Verify the user was actually created in the database
      const dbUser = await prisma.user.findUnique({ where: { email: testUser.email } });
      expect(dbUser).not.toBeNull();
      expect(dbUser.email).toBe(testUser.email);
    });

    // it('should return 400 if email is already taken', async () => {
    //   // First, create a user to ensure the email exists
    //   await request.post(registerEndpoint).send(testUser);

    //   // Now, try to register with the same email
    //   const response = await request
    //     .post(registerEndpoint)
    //     .send(testUser);

    //   // Assertions
    //   expect(response.status).toBe(400);
    //   // The exact message depends on your controller's error handling
    //   expect(response.body.message).toContain('User already exists');
    // });
  });

  // Test suite for the POST /api/users/login endpoint
  describe(`POST ${loginEndpoint}`, () => {
    // Register a user before trying to log in
    beforeEach(async () => {
      await request.post(registerEndpoint).send(testUser);
    });

    it('should log in an existing user and return a token', async () => {
      const response = await request
        .post(loginEndpoint)
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe(testUser.email);
      expect(response.body.message).toBe('User logged in successfully');
    });

    // it('should return 401 for incorrect password', async () => {
    //     const response = await request
    //         .post(loginEndpoint)
    //         .send({
    //             email: testUser.email,
    //             password: 'wrongpassword',
    //         });

    //     // Assertions
    //     expect(response.status).toBe(401); // Unauthorized
    //     expect(response.body.message).toBe('Invalid credentials');
    // });

    // it('should return 404 if user does not exist', async () => {
    //     const response = await request
    //         .post(loginEndpoint)
    //         .send({
    //             email: 'nouser@example.com',
    //             password: 'password123',
    //         });

    //     // Assertions
    //     expect(response.status).toBe(404);
    //     expect(response.body.message).toContain('User no exists');
    // });
  });
});
