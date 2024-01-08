const request = require("supertest");
const { app } = require("./app");
const { server } = require(".");

describe("POST /api/auth/login", () => {
  describe("Given valid credentials", () => {
    test("Should respond with {success: true, token: '****'} ", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "mahirlabibdihan@gmail.com",
        pass: "root",
        type: "1",
      });
      expect(res.statusCode).toBe(200);
      expect(res.type).toEqual("application/json");
      expect(res.body).toHaveProperty("access_token");
    });
  });

  describe("Given Invalid credentials", () => {
    test("Should respond with {success: false, error: 'Invalid credentials'} ", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "mahirlabibdihan@gmail.com",
        pass: "toor",
        type: "1",
      });
      expect(res.statusCode).toBe(401);
      expect(res.type).toEqual("application/json");
      expect(res.body).toHaveProperty("error");
    });
  });
});

afterAll((done) => {
  server.close(done);
});
