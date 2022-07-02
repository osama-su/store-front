import db from "../database";
import productInterface from "../interfaces/productInterface";

class Product {
  // create a new product
  async create(product: productInterface): Promise<productInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `INSERT INTO products (name, description, price, category, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, description, price, category, created_at, updated_at`;
      // insert the user into the database
      product.created_at = new Date();
      product.updated_at = new Date();
      const result = await connection.query(query, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.created_at,
        product.updated_at,
      ]);
      // close the database connection
      connection.release();
      // return the product
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${product.name}): ${(error as Error).message}`
      );
    }
  }

  // get all products
  async getAll(): Promise<productInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT id, name, description, price, category, created_at, updated_at FROM products`;
      // get all products from the database
      const result = await connection.query(query);
      // close the database connection
      connection.release();
      // return the users
      return result.rows;
    } catch (error) {
      throw new Error(
        `Unable to get all products: ${(error as Error).message}`
      );
    }
  }

  // get a single product by id
  async getById(id: number): Promise<productInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT id, name, description, price, category, created_at, updated_at FROM products WHERE id = $1`;
      // get the product from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get product with id ${id}: ${(error as Error).message}`
      );
    }
  }

  // update a product
  async update(
    id: number,
    product: productInterface
  ): Promise<productInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      product.updated_at = new Date();
      const query = `UPDATE products SET name = $1, description = $2, price = $3, category = $4, updated_at = $5 WHERE id = $6 RETURNING name, description, price, category, created_at, updated_at`;
      // update the product in the database
      const result = await connection.query(query, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.updated_at,
        id,
      ]);
      // close the database connection
      connection.release();
      // return the product
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update (${product.name}): ${(error as Error).message}`
      );
    }
  }

  // delete a product
  async delete(id: number): Promise<productInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `DELETE FROM products WHERE id = $1 RETURNING id, name, description, price, category, created_at, updated_at`;
      // delete the product from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the product
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to delete product with id ${id}: ${(error as Error).message}`
      );
    }
  }
}

export default Product;
