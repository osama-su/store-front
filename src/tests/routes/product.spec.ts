import supertest from "supertest";
import app from "../../app";
import db from "../../database";
import User from "../../Models/User";
import UserInterface from "../../interfaces/userInterface";

const request = supertest(app);
const user = new User();
let token = "";

describe("Product API Endpoints Tests", () => {
  const demoUser = {
    email: "testie@testie.com",
    username: "testie",
    first_name: "test",
    last_name: "user",
    password: "test",
  } as UserInterface;

  beforeAll(async () => {
    const createdUser = await user.create(demoUser);
    demoUser.id = createdUser.id;
  });
  afterAll(async () => {
    const connection = await db.connect();
    const query = `DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
    await connection.query(query);
    connection.release();
  });
  describe("Authentication Tests", () => {
    it("should return the authenticated user", async () => {
      const res = await request
        .post("/api/users/authenticate")
        .set("Content-Type", "application/json")
        .send({
          username: demoUser.username,
          password: demoUser.password,
        });
      token = res.body.data.token;
      expect(res.body.data.username).toBe(demoUser.username);
      expect(res.body.data.id).toBe(demoUser.id);
    });
    it("should return null if the user is not found", async () => {
      const res = await request
        .post("/api/users/authenticate")
        .set("Content-Type", "application/json")
        .send({
          username: "testnotthere",
          password: "test",
        });
      expect(res.status).toBe(401);
    });
  });
  describe("Product CRUD Tests", () => {
    it("should return a list of products", async () => {
      const res = await request
        .get("/api/products")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("should return a single product", async () => {
      const res = await request
        .get(`/api/users/1`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("should create a new product", async () => {
      const res = await request
        .post("/api/products")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test",
          description: "test",
          price: 1,
          category: "test",
        });
      expect(res.status).toBe(200);
    });
    it("should update a product", async () => {
      const res = await request
        .patch(`/api/products/1`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 1,
          name: "nottest",
          description: "nottest",
          price: 199,
          category: "nottest",
        });
      expect(res.status).toBe(200);
    });
    it("should delete a product", async () => {
      const res = await request
        .delete(`/api/products/1`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
