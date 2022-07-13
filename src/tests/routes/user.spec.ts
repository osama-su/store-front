import supertest from "supertest";
import app from "../../app";
import db from "../../database";
import User from "../../Models/User";
import UserInterface from "../../interfaces/userInterface";

const request = supertest(app);
const user = new User();
let token = "";

describe("User API Endpoints Tests", () => {
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
      token = res.body.token;
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
  describe("User CRUD Tests", () => {
    it("should return a list of users", async () => {
      const res = await request
        .get("/api/users")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("should return a single user", async () => {
      const res = await request
        .get(`/api/users/${demoUser.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("should create a new user", async () => {
      const res = await request
        .post("/api/users")
        .set("Content-Type", "application/json")
        // .set("Authorization", `Bearer ${token}`)
        .send({
          email: "test2@testie.com",
          username: "test2",
          first_name: "test2",
          last_name: "user2",
          password: "test",
        });
      expect(res.status).toBe(200);
    });
    it("should update a user", async () => {
      const res = await request
        .patch(`/api/users/${demoUser.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...demoUser,
          email: "test22@testie.com",
          first_name: "test2",
          last_name: "user2",
        });
      expect(res.status).toBe(200);
    });
    it("should delete a user", async () => {
      const res = await request
        .delete(`/api/users/${demoUser.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
