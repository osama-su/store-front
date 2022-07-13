import supertest from "supertest";
import db from "../../database";
import app from "../../app";
import User from "../../Models/User";
import UserInterface from "../../interfaces/userInterface";

const user = new User();
const request = supertest(app);
let token: string = "";

describe("Orders API Endpoints", () => {
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
    // clean db
    const connection = await db.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1";
    await connection.query(sql);
    connection.release();
  });

  describe("Test Authenticate method", () => {
    it("should be able to authenticate to get token", async () => {
      const res = await request
        .post("/api/users/authenticate")
        .set("Content-type", "application/json")
        .send({
          username: demoUser.username,
          password: demoUser.password,
        });
      token = res.body.data.token;
      expect(res.body.data.username).toBe(demoUser.username);
      expect(res.body.data.id).toBe(demoUser.id);
    });
  });

  describe("Test CRUD API methods", () => {
    it("should create new product", async () => {
      const res = await request
        .post("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          userId: 1,
          status: "active",
        });
      expect(res.status).toBe(200);
      const { id, status, userId } = res.body.data;
      expect(id).toBe(1);
      expect(status).toBe("active");
      // expect(userId).toBe(1);
    });

    it("should get list of orders", async () => {
      const res = await request
        .get("/api/orders/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].status).toBe("active");
      expect(res.body.data[0].username).toBe("testie");
    });

    it("should get order info", async () => {
      const res = await request
        .get("/api/orders/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
      expect(res.body.data.status).toBe("active");
      expect(res.body.data.username).toBe("testie");
    });

    it("should update order info", async () => {
      const res = await request
        .patch("/api/orders/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 1,
          userId: 1,
          status: "active",
        });

      const { id, status, userId } = res.body.data;

      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(status).toBe("active");
    });

    it("should delete order", async () => {
      const res = await request
        .delete("/api/orders/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });
  });
});
