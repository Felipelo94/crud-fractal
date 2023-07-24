import bcrypt from "bcrypt";
import { pool } from "../../../config/db";

export default async function registerHandler(req, res) {
  if (req.method !== "POST") {
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
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
