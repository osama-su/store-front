import db from "../database";
import UserInterface from "../interfaces/userInterface";
import config from "../config";
import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  // apply pepper to the password
  const pepper = config.pepper;
  const pepperPassword = `${password}${pepper}`;
  // hash the pepperPassword
  // const salt = await bcrypt.genSalt(parseInt(config.salt as string, 10));
  const salt = parseInt(config.salt as string, 10);
  const hash = bcrypt.hashSync(pepperPassword, salt);
  return hash;
};

class User {
  // create a new user
  async create(user: UserInterface): Promise<UserInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `INSERT INTO users (username, first_name, last_name, email, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, first_name, last_name, email, created_at, updated_at`;
      // insert the user into the database
      user.created_at = new Date();
      user.updated_at = new Date();
      const result = await connection.query(query, [
        user.username,
        user.first_name,
        user.last_name,
        user.email,
        hashPassword(user.password),
        user.created_at,
        user.updated_at,
      ]);
      // close the database connection
      connection.release();
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${user.username}): ${(error as Error).message}`
      );
    }
  }

  // get all users
  async getAll(): Promise<UserInterface[]> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT id, username, first_name, last_name, email, created_at, updated_at FROM users`;
      // get all users from the database
      const result = await connection.query(query);
      // close the database connection
      connection.release();
      // return the users
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get all users: ${(error as Error).message}`);
    }
  }

  // get a single user by id
  async getById(id: number): Promise<UserInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `SELECT id, username, first_name, last_name, email, created_at, updated_at FROM users WHERE id = $1`;
      // get the user from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to get user with id ${id}: ${(error as Error).message}`
      );
    }
  }

  // update a user
  async update(id: number, user: UserInterface): Promise<UserInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      user.updated_at = new Date();
      const query = `UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, password = $5, updated_at = $6 WHERE id = $7 RETURNING username, first_name, last_name, email, created_at, updated_at`;
      // update the user in the database
      const result = await connection.query(query, [
        user.username,
        user.first_name,
        user.last_name,
        user.email,
        hashPassword(user.password),
        user.updated_at,
        id,
      ]);
      // close the database connection
      connection.release();
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to update (${user.username}): ${(error as Error).message}`
      );
    }
  }

  // delete a user
  async delete(id: number): Promise<UserInterface> {
    try {
      // open the database connection
      const connection = await db.connect();
      const query = `DELETE FROM users WHERE id = $1 RETURNING id, username, first_name, last_name, email, created_at, updated_at`;
      // delete the user from the database
      const result = await connection.query(query, [id]);
      // close the database connection
      connection.release();
      // return the user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to delete user with id ${id}: ${(error as Error).message}`
      );
    }
  }

  // authenticate a user
}

export default User;
