import bcrypt from "bcrypt";
import { pool } from "../../../config/db";
import { logger } from "../../../lib/logger/logger";

export default async function registerHandler(req, res) {
  if (req.method !== "POST") {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Register",
      msg: "Method Not Allowed",
    });
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertResult = await pool.query(
      "INSERT INTO usersData (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    if (insertResult[0].affectedRows > 0) {
      logger.info({
        userIp: req.headers["x-forwarded-for"],
        action: "Register",
        msg: "User registered successfully",
      });
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      logger.info({
        userIp: req.headers["x-forwarded-for"],
        action: "Register",
        msg: "Failed to register user",
      });
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Register",
      msg: "Internal server error",
    });
    return res.status(500).json({ message: "Internal server error" });
  }
}
