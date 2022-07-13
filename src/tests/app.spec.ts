import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("Test the root path", () => {
  it("should return 200", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
