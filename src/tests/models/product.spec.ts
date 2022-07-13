import Product from "../../Models/Product";
import db from "../../database";
import ProductInterface from "../../interfaces/productInterface";

const product = new Product();

describe("Product Model", () => {
  describe("Methods exist", () => {
    it("should have create method", () => {
      expect(product.create).toBeDefined();
    }),
      it("should have get method", () => {
        expect(product.getById).toBeDefined();
      }),
      it("should have getAll method", () => {
        expect(product.getAll).toBeDefined();
      }),
      it("should have update method", () => {
        expect(product.update).toBeDefined();
      }),
      it("should have delete method", () => {
        expect(product.delete).toBeDefined();
      });
  });
  describe("Methods Logic", () => {
    const demoProduct = {
      name: "Test Product",
      description: "This is a test product",
      price: 10.0,
      category: "Test",
    } as ProductInterface;

    beforeAll(async () => {
      const createdProduct = await product.create(demoProduct);
      demoProduct.id = createdProduct.id;
    });
    afterAll(async () => {
      const connection = await db.connect();
      const query = `DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;`;
      await connection.query(query);
      connection.release();
    });
    it("should return a new product when create is called", async () => {
      const demoProduct2 = {
        name: "Test Product",
        description: "This is a test product",
        price: 10.0,
        category: "Test",
      } as ProductInterface;
      const createdProduct = await product.create(demoProduct2);
      expect(createdProduct.name).toBe(demoProduct2.name);
    });
    it("should return a user when getById is called", async () => {
      const returnedProduct = await product.getById(demoProduct.id as number);
      expect(returnedProduct.name).toBe(demoProduct.name);
    });
    it("should return all users when getAll is called", async () => {
      const returnedProduct = await product.getAll();
      expect(returnedProduct.length).toBeGreaterThan(0);
    });
    it("should return a user when update is called", async () => {
      const updatedProduct = await product.update(demoProduct.id as number, {
        ...demoProduct,
        price: 20,
        description: "not",
        category: "product",
      });
      expect(updatedProduct.id).toBe(demoProduct.id);
      expect(updatedProduct.name).toBe(demoProduct.name);
      expect(updatedProduct.price).toBe(20);
      expect(updatedProduct.description).toBe("not");
      expect(updatedProduct.category).toBe("product");
    });

    it("should return a user when delete is called", async () => {
      const deletedProduct = await product.delete(demoProduct.id as number);
      expect(deletedProduct.id).toBe(demoProduct.id);
    });
  });
});
