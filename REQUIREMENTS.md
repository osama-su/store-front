# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body: - `none`
  - Response Body -- `Array of user objects`

- Show **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id` - **id of the user to be retrieved**
  - Request Body - `none`
  - Response Body -- `User object`

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/users`
  - Request Body - `User object`

  - Response Body -- `User object`

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/users/:id` - **id of the user to be deleted**
  - Request Body - `none`

  - Response Body -- `Deleted User object`

- Edit **`token required`**

  - HTTP verb `PATCH`
  - Endpoint:- `/api/users/:id`
  - Request Body - `User object`
  - Response Body -- `Updated User object`

- Authenticate

  - HTTP verb `POST`
  - Endpoint:- `/api/users/authenticate`
  - Request Body - `User object`

  - Response Body -- `Updated User object`

### Products

- Index

  - HTTP verb `GET`
  - Endpoint:- `/api/products/`
  - Request Body - `none`

  - Response Body -- `Array of products`

- Show

  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id` - **id of the product to be retrieved**
  - Request Body - `none`

  - Response Body -- `Product object`

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/products`
  - Request Body - `Product object`

  - Response Body -- `User object`

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/products/:id` - **id of the product to be deleted**
  - Request Body - `none`
  - Response Body -- `Deleted Product object`

- Edit **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/api/products/:id`
  - Request Body - `Product object`

  - Response Body -- `Updated User object`

- **[OPTIONAL]** Top 5 most popular products
- **[OPTIONAL]** Products by category (args: product category)

### Orders

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/orders/`
  - Request Body

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

- Show - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:id` - **id of the order to be retrieved**
  - Request Body

  - Response Body -- `Order object`

- Create **`token required`**

  - HTTP verb `POST`
  - Endpoint:- `/api/orders`
  - Request Body - `Order object`

  - Response Body -- `User object`

- Delete **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/orders/:id` - **id of the order to be deleted**
  - Request Body

  - Response Body -- `Deleted Order object`

- Edit **`token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/api/orders/:id`
  - Request Body

  - Response Body -- `Updated User object`

- [OPTIONAL] Completed Orders by user [args: user id](token required)

### Order Products

- Index - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/order-products/:order_id/products` - **id of the order**
  - Request Body

  - Response Body -- `An array of the products associated with an order`

- Show - **`token required`**

  - HTTP verb `GET`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

  - Response Body -- `An array of the products associated with an order`

- Edit - **`token required`**

  - HTTP verb `PATCH`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body - `Order Product object`

  - Response Body -- `An array of the products associated with an order`

- Delete - **`token required`**

  - HTTP verb `DELETE`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

  - Response Body -- `An array of the products associated with an order`

## Data Schema

### Products Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Users Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  username VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Orders Schema

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  status VARCHAR(10) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Products for each Order Schema

```sql
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

## Data Shapes

### User

```typescript
interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
```

### Product

```typescript
interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at?: Date;
  updated_at?: Date;
}
```

### Order

```typescript
interface OrderInterface {
  id?: number;
  status: string;
  userId: number;
  username?: string;
  products?: OrderProductInterface[];
  created_at?: Date;
  updated_at?: Date;
}
```

### Order Product

```typescript
interface OrderProductInterface {
  id?: number;
  quantity: number;
  productId: number;
  orderId: number;
  products?: ProductInterface[];
  created_at?: Date;
  updated_at?: Date;
}
```
