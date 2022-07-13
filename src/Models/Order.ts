import db from "../database";
import OrderInterface from "../interfaces/orderInterface";
import OrderProductInterface from "../interfaces/order-productInterface";
import Error from "../interfaces/errorInterface";

class Order {
  private formatOrder(order: OrderInterface): OrderInterface {
    const {
      id,
      status,
      userId,
      username,
      products: OrderProductInterface,
    } = order;
    return {
      id,
      status,
      userId,
      username,
      products:
        Array.isArray(order.products) &&
        order.products.length > 0 &&
        order.products[0]?.quantity
          ? order.products
          : [],
    };
  }

  async create(order: OrderInterface): Promise<OrderInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `INSERT INTO orders (status, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id, status, user_id, created_at, updated_at`;
      // create the order in the database
      order.created_at = new Date();
      order.updated_at = new Date();
      const result = await connection.query(query, [
        order.status,
        order.userId,
        order.created_at,
        order.updated_at,
      ]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrder(result.rows[0]);
    } catch (error) {
      throw new Error(`Unable to create order: ${(error as Error).message}`);
    }
  }
  // get all orders
  async getAll(): Promise<OrderInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT orders.id, orders.status, orders.user_id, users.username,
      JSON_AGG(JSON_BUILD_OBJECT(
          'productId', products.id, 
          'name', products.name, 
          'description', products.description, 
          'category', products.category,
          'price', products.price,
          'quantity', order_products.quantity
          )) as products,
      orders.created_at, orders.updated_at FROM orders 
      LEFT JOIN order_products ON orders.id = order_products.order_id
      LEFT JOIN products ON order_products.product_id = products.id
      LEFT JOIN users ON orders.user_id = users.id
      GROUP BY orders.id, users.username, orders.status`;
      // get all orders from the database
      const result = await connection.query(query);
      // close the database connection
      connection.release();
      // return the orders
      return result.rows.map((order) => this.formatOrder(order));
    } catch (error) {
      throw new Error(`Unable to get all orders: ${(error as Error).message}`);
    }
  }
  // get a single order by id
  async getById(id: number): Promise<OrderInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT orders.id, orders.status, orders.user_id, users.username,
        JSON_AGG(JSON_BUILD_OBJECT(
            'productId', products.id,
            'name', products.name,
            'description', products.description,
            'category', products.category,
            'price', products.price,
            'quantity', order_products.quantity
            )) as products,
        orders.created_at, orders.updated_at FROM orders
        LEFT JOIN order_products ON orders.id = order_products.order_id
        LEFT JOIN products ON order_products.product_id = products.id
        LEFT JOIN users ON orders.user_id = users.id
        WHERE orders.id = $1
        GROUP BY orders.id, users.username, orders.status`;

      // get the order from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrder(result.rows[0]);
    } catch (error) {
      throw new Error(`Unable to get order by id: ${(error as Error).message}`);
    }
  }
  // update an order
  async update(order: OrderInterface): Promise<OrderInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      order.updated_at = new Date();
      const query = `UPDATE orders SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id, status, user_id`;
      // update the order in the database
      const result = await connection.query(query, [
        order.status,
        order.updated_at,
        order.id,
      ]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrder(result.rows[0]);
    } catch (error) {
      throw new Error(`Unable to update order: ${(error as Error).message}`);
    }
  }
  // delete an order
  async delete(id: number): Promise<OrderInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `DELETE FROM orders WHERE id = $1 RETURNING id, status, user_id`;
      // delete the order from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrder(result.rows[0]);
    } catch (error) {
      throw new Error(`Unable to delete order: ${(error as Error).message}`);
    }
  }
  // get all orders for a user
  async getAllByUserId(userId: number): Promise<OrderInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT orders.id, orders.status, orders.user_id, users.username,
        JSON_AGG(JSON_BUILD_OBJECT(
            'productId', products.id,
            'name', products.name,
            'description', products.description,
            'category', products.category,
            'price', products.price,
            'quantity', order_products.quantity
            )) as products,
        orders.created_at, orders.updated_at FROM orders
        LEFT JOIN order_products ON orders.id = order_products.order_id
        LEFT JOIN products ON order_products.product_id = products.id
        LEFT JOIN users ON orders.user_id = users.id
        WHERE orders.user_id = $1
        GROUP BY orders.id, users.username, orders.status`;

      // get all orders for the user from the database
      const result = await connection.query(query, [userId]);
      // close the database connection
      connection.release();
      // return the orders
      return result.rows.map((order) => this.formatOrder(order));
    } catch (error) {
      throw new Error(
        `Unable to get all orders for user: ${(error as Error).message}`
      );
    }
  }
}

export default Order;
