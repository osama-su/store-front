import db from "../database";
import OrderProductInterface from "../interfaces/order-productInterface";
import Product from "../interfaces/productInterface";

class OrderProduct {
  private formatOrderProduct(
    orderProduct: OrderProductInterface
  ): OrderProductInterface {
    const {
      id,
      orderId,
      productId,
      quantity,
      products: Product,
    } = orderProduct;
    return {
      id,
      orderId,
      productId,
      quantity,
      products:
        Array.isArray(orderProduct.products) &&
        orderProduct.products.length > 0 &&
        orderProduct.products[0]?.name
          ? orderProduct.products
          : [],
    };
  }

  async create(
    orderProduct: OrderProductInterface
  ): Promise<OrderProductInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id, order_id, product_id, quantity`;
      // create the order in the database
      const result = await connection.query(query, [
        orderProduct.orderId,
        orderProduct.productId,
        orderProduct.quantity,
      ]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrderProduct(result.rows[0]);
    } catch (error) {
      throw new Error(
        `Unable to create order: ${orderProduct.orderId} containing product: ${
          orderProduct.productId
        } : ${(error as Error).message}`
      );
    }
  }

  async getAll(): Promise<OrderProductInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT orders.id, order_products.id, order_products.order_id, order_products.product_id, order_products.quantity,
            JSON_AGG(JSON_BUILD_OBJECT(
                'id', products.id, 
                'name', products.name, 
                'description', products.description, 
                'category', products.category,
                'price', products.price,
                'quantity', order_products.quantity
            )) AS products 
            FROM orders
            LEFT JOIN order_products ON orders.id = order_products.order_id 
            LEFT JOIN products ON order_products.product_id = products.id 
            GROUP BY orders.id, order_products.order_id, order_products.product_id`;
      // get all orders from the database
      const result = await connection.query(query);
      // close the database connection
      connection.release();
      // return the orders
      return result.rows.map((orderProduct) =>
        this.formatOrderProduct(orderProduct)
      );
    } catch (error) {
      throw new Error(`Unable to get orders: ${(error as Error).message}`);
    }
  }

  async getByOrderId(orderId: number): Promise<OrderProductInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT orders.id, order_products.id, order_products.order_id, order_products.product_id, order_products.quantity,
                    JSON_AGG(JSON_BUILD_OBJECT(
                        'id', products.id, 
                        'name', products.name, 
                        'description', products.description, 
                        'category', products.category,
                        'price', products.price,
                        'quantity', order_products.quantity
                    )) AS products 
                    FROM orders
                    LEFT JOIN order_products ON orders.id = order_products.order_id 
                    LEFT JOIN products ON order_products.product_id = products.id 
                    WHERE orders.id = $1
                    GROUP BY orders.id, order_products.order_id, order_products.product_id`;
      // get all orders from the database
      const result = await connection.query(query, [orderId]);
      // close the database connection
      connection.release();
      // return the orders
      return result.rows.map((orderProduct) =>
        this.formatOrderProduct(orderProduct)
      );
    } catch (error) {
      throw new Error(`Unable to get orders: ${(error as Error).message}`);
    }
  }
  async update(
    orderProduct: OrderProductInterface
  ): Promise<OrderProductInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `UPDATE order_products SET quantity = $1, order_id= $2, product_id= $3 WHERE id = $4 RETURNING id, order_id, product_id, quantity`;
      // update the order in the database
      const result = await connection.query(query, [
        orderProduct.quantity,
        orderProduct.orderId,
        orderProduct.productId,
        orderProduct.id,
      ]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrderProduct(result.rows[0]);
    } catch (error) {
      throw new Error(
        `Unable to update order: ${orderProduct.id} containing product: ${
          orderProduct.productId
        } : ${(error as Error).message}`
      );
    }
  }

  async delete(id: number): Promise<OrderProductInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `DELETE FROM order_products WHERE id = $1 RETURNING id, order_id, product_id, quantity`;
      // delete the order in the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the order
      return this.formatOrderProduct(result.rows[0]);
    } catch (error) {
      throw new Error(
        `Unable to delete order: ${id} : ${(error as Error).message}`
      );
    }
  }
}

export default OrderProduct;
