import supertest from "supertest";
import db from "../../database";
import app from "../../app";
import User from "../../Models/User";
import Product from "../../Models/Product";
import Order from "../../Models/Order";
import UserInterface from "../../interfaces/userInterface";
import OrderProductInterface from "../../interfaces/order-productInterface";
import OrderInterface from "../../interfaces/orderInterface";
import ProductInterface from "../../interfaces/productInterface";

const user = new User();
const product = new Product();
const order = new Order();
const request = supertest(app);
let token: string = "";

describe("Order Product API Endpoints", () => {
  const demoUser = {
    email: "testie@testie.com",
    username: "testie",
    first_name: "test",
    last_name: "user",
    password: "test",
  } as UserInterface;

  const demoProduct = {
    name: "product name",
    description: "product description",
    price: 9.99,
    category: "Electronics.",
  } as ProductInterface;

  const demoOrder = {
    userId: 1,
    status: "active",
  } as OrderInterface;

  const demoOrderProduct = {
    quantity: 1,
    orderId: 1,
    productId: 1,
  } as OrderProductInterface;

  beforeAll(async () => {
    // setup user/product to test with
    const createdUser = await user.create(demoUser);
    await product.create(demoProduct);
    await order.create(demoOrder);
    demoUser.id = createdUser.id;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
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
    it("should create new order product", async () => {
      const res = await request
        .post("/api/orderProducts/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(demoOrderProduct);
      expect(res.status).toBe(200);
      const { id, quantity, orderId } = res.body.data;
      expect(id).toBe(1);
      expect(quantity).toBe(1);
    });

    it("should get list of order products", async () => {
      const res = await request
        .get("/api/orderProducts/1/")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("should get order product info", async () => {
      const res = await request
        .get("/api/orderProducts/1/products/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it("should update order product info", async () => {
      const res = await request
        .get("/api/orderProducts/1/products/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 1,
          productId: 1,
          orderId: 1,
          quantity: 2,
        });
      const { id, productId, orderId, quantity } = res.body.data;

      expect(res.status).toBe(200);
    });

    it("should delete order", async () => {
      const res = await request
        .delete("/api/orderProducts/1/products/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          productId: 1,
          orderId: 1,
        });
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });
  });
});
