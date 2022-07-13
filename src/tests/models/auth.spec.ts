import User from "../../Models/User";
import db from "../../database";
import UserInterface from "../../interfaces/userInterface";

const user = new User();

describe("Authentication Tests", () => {
  describe("Methods exist", () => {
    it("should have authenticate method", () => {
      expect(user.authenticate).toBeDefined();
    });
  });
  describe("Authenticate method", () => {
    const demoUser = {
      email: "test@testie.com",
      username: "test",
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
    it("should return the authenticated user", async () => {
      const authenticatedUser = await user.authenticate(
        demoUser.username,
        demoUser.password
      );
      expect(authenticatedUser?.username).toBe(demoUser.username);
    });
    it("should return null if the user is not found", async () => {
      const authenticatedUser = await user.authenticate("testnotthere", "test");
      expect(authenticatedUser).toBeNull();
    });
  });
});
