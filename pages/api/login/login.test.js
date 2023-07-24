import bcrypt from "bcrypt";
import loginHandler from "./index.js";
import { pool } from "../../../config/db";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("cookie");

describe("loginHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return Method Not Allowed for non-POST requests", async () => {
    const req = { method: "GET" };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await loginHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method Not Allowed" });
  });

  test("should return User doesn't exist if no user is found", async () => {
    const req = {
      method: "POST",
      body: { email: "nonexistent@example.com", password: "password123" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    pool.query = jest.fn().mockResolvedValue([]);

    await loginHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User doesn't exist" });
  });

  test("should return internal server error", async () => {
    const req = {
      method: "POST",
      body: { email: "existing@example.com", password: "wrongpassword" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    pool.query = jest.fn().mockResolvedValue([{ password: "hashedPassword" }]);
    bcrypt.compare.mockResolvedValue(false);

    await loginHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });

  test("should return User doesn't exist", async () => {
    const req = {
      method: "POST",
      body: { email: "existing@example.com", password: "correctpassword" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    pool.query = jest.fn().mockResolvedValue(new Error("Database error"));

    await loginHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User doesn't exist" });
  });
});
