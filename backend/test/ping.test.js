const request = require("supertest");
const { app } = require("../app");
const { server } = require("..");

describe("Ping API Routes", () => {
  it("Ping Test", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hi, welcome to Bits Unplugged");
  });
});
afterAll((done) => {
  server.close(done);
});
