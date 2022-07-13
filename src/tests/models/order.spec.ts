import db from "../../database";
import UserInterface from "../../interfaces/userInterface";
import ProductInterface from "../../interfaces/productInterface";
import OrderInterface from "../../interfaces/orderInterface";
import Order from "../../Models/Order";
import User from "../../Models/User";
import Product from "../../Models/Product";

const user = new User();
const product = new Product();
const order = new Order();

describe("Order Model", () => {
  describe("Test methods exist", () => {
    it("should have an getAll method", () => {
      expect(order.getAll).toBeDefined();
    });

    it("should have a getById method", () => {
      expect(order.getById).toBeDefined();
    });

    it("should have a create method", () => {
      expect(order.create).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(order.delete).toBeDefined();
    });
  });

  describe("Test Model logic", () => {
    const demoUser = {
      email: "test@test.com",
      username: "testUser",
      first_name: "Test",
      last_name: "User",
      password: "test123",
    } as UserInterface;

    const demoProduct = {
      name: "product name",
      description: "product description",
      price: 20,
      category: "Electronics.",
    } as ProductInterface;

    const demoOrder = {
      userId: 1,
      status: "active",
    } as OrderInterface;

    beforeAll(async () => {
      // setup user/product to test with
      await user.create(demoUser);
      await product.create(demoProduct);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;";
      await connection.query(sql);
      connection.release();
    });

    it("Create method should add an order", async () => {
      const createdOrder = await order.create(demoOrder);
      expect(createdOrder.id).toEqual(1);
    });

    it("getAll method should return a list of orders", async () => {
      const orders = await order.getAll();
      expect(orders[0].id).toBe(1);
    });

    it("getById method should return the correct order", async () => {
      const returnedOrder = await order.getById(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it("update method should return an order with updateed attributes", async () => {
      const returnedOrder = await order.update({
        id: 1,
        userId: 1,
        status: "completed",
      });
      expect(returnedOrder.status).toBe("completed");
    });

    it("Delete method should remove the order", async () => {
      const deletedOrder = await order.delete(1);
      expect(deletedOrder.id).toBe(1);
    });
  });
});
