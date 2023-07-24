import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";
import { pool } from "../../../config/db";
import { logger } from "../../../lib/logger/logger";

export default async function loginHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const queryResult = await pool.query(
      "SELECT * FROM usersdata WHERE email = ?;",
      [email]
    );

    if (queryResult.length > 0) {
      const hashedPasswordFromDB = queryResult[0][0].password;
      const passwordMatch = await bcrypt.compare(
        password,
        hashedPasswordFromDB
      );

      if (passwordMatch) {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            email,
          },
          "secret"
        );

        const serialized = serialize("userToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 10,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);

        logger.info({
          userIp: req.headers["x-forwarded-for"],
          action: "set-cookie and login",
          msg: "Login successful",
        });

        return res.status(200).json({ message: "Login successful" });
      } else {
        logger.info({
          userIp: req.headers["x-forwarded-for"],
          action: "set-cookie and login",
          msg: "Wrong username/password combination!",
        });
        return res
          .status(401)
          .json({ message: "Wrong username/password combination!" });
      }
    } else {
      logger.info({
        userIp: req.headers["x-forwarded-for"],
        action: "set-cookie and login",
        msg: "User doesn't exist",
      });
      return res.status(404).json({ message: "User doesn't exist" });
    }
  } catch (error) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "set-cookie and login",
      msg: "Internal server error",
    });
    return res.status(500).json({ message: "Internal server error" });
  }
}
