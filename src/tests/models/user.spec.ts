import User from "../../Models/User";
import db from "../../database";
import UserInterface from "../../interfaces/userInterface";

const user = new User();

describe("User Model", () => {
  describe("Methods exist", () => {
    it("should have create method", () => {
      expect(user.create).toBeDefined();
    }),
      it("should have get method", () => {
        expect(user.getById).toBeDefined();
      }),
      it("should have getAll method", () => {
        expect(user.getAll).toBeDefined();
      }),
      it("should have update method", () => {
        expect(user.update).toBeDefined();
      }),
      it("should have delete method", () => {
        expect(user.delete).toBeDefined();
      });
  });
  describe("Methods Logic", () => {
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
      const connection = await db.connect();
      const query = `DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;`;
      await connection.query(query);
      connection.release();
    });
    it("should return a new user when create is called", async () => {
      const demoUser2 = {
        email: "test2@testie.com",
        username: "test2",
        first_name: "test2",
        last_name: "user",
        password: "test",
      } as UserInterface;
      const createdUser = await user.create(demoUser2);
      expect(createdUser.username).toBe(demoUser2.username);
    });
    it("should return a user when getById is called", async () => {
      const returnedUser = await user.getById(demoUser.id as number);
      expect(returnedUser.username).toBe(demoUser.username);
    });
    it("should return all users when getAll is called", async () => {
      const returnedUsers = await user.getAll();
      expect(returnedUsers.length).toBeGreaterThan(0);
    });
    it("should return a user when update is called", async () => {
      const updatedUser = await user.update(demoUser.id as number, {
        ...demoUser,
        username: "nottest",
        first_name: "not",
        last_name: "user",
      });
      expect(updatedUser.id).toBe(demoUser.id);
      expect(updatedUser.email).toBe(demoUser.email);
      expect(updatedUser.username).toBe("nottest");
      expect(updatedUser.first_name).toBe("not");
      expect(updatedUser.last_name).toBe("user");
    });
    it("should return a user when delete is called", async () => {
      const deletedUser = await user.delete(demoUser.id as number);
      expect(deletedUser.id).toBe(demoUser.id);
    });
  });
});
