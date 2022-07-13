import db from "../../database";
import UserInterface from "../../interfaces/userInterface";
import ProductInterface from "../../interfaces/productInterface";
import OrderInterface from "../../interfaces/orderInterface";
import OrderProductInterface from "../../interfaces/order-productInterface";
import Order from "../../Models/Order";
import User from "../../Models/User";
import Product from "../../Models/Product";
import OrderProduct from "../../Models/OrderProduct";

const user = new User();
const product = new Product();
const order = new Order();
const orderProduct = new OrderProduct();

describe("Order Product Model", () => {
  describe("Test methods exist", () => {
    it("should have an index method", () => {
      expect(orderProduct.getAll).toBeDefined();
    });

    it("should have a show method", () => {
      expect(orderProduct.getByOrderId).toBeDefined();
    });

    it("should have a create method", () => {
      expect(orderProduct.create).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(orderProduct.delete).toBeDefined();
    });
  });

  describe("Test Order Products Model logic", () => {
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

    const demoOrderProduct = {
      quantity: 1,
      orderId: 1,
      productId: 1,
    } as OrderProductInterface;

    beforeAll(async () => {
      // setup user/product to test with
      await user.create(demoUser);
      await product.create(demoProduct);
      await order.create(demoOrder);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
      await connection.query(sql);
      connection.release();
    });

    it("Create method should return an order product", async () => {
      const createdOrderProduct = await orderProduct.create(demoOrderProduct);
      expect(createdOrderProduct.quantity).toBe(1);
    });

    it("Index method should return a list of products in a specific order", async () => {
      const orderProducts = await orderProduct.getAll();
      expect(orderProducts[0].id).toBe(1);
    });

    it("Show method should return the correct product in a specific order", async () => {
      const targetOrderProduct = await orderProduct.getByOrderId(1);
      expect(targetOrderProduct[0].quantity).toBe(1);
    });

    it("Edit method should return a order with edited properties", async () => {
      const editOrderProduct = await orderProduct.update({
        id: 1,
        quantity: 10,
        orderId: 1,
        productId: 1,
      });
      expect(editOrderProduct.quantity).toEqual(10);
    });

    it("Delete method should remove products from list of product in order", async () => {
      const deletedOrderProduct = await orderProduct.delete(1);
      expect(deletedOrderProduct.id).toBe(1);
    });
  });
});
