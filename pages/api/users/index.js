import { pool } from "../../../config/db";
import { logger } from "../../../lib/logger/logger";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUser(req, res);
    case "POST":
      return await saveUser(req, res);
  }
}

const saveUser = async (req, res) => {
  try {
    const { firstName, lastName, positionDesc } = req.body;

    const [resp] = await pool.query("INSERT INTO users SET ?", {
      firstName: firstName,
      lastName: lastName,
      positionDesc: positionDesc,
    });
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "saveUser",
      msg: "Saved user",
    });
    return res
      .status(200)
      .json({ firstName, lastName, positionDesc, id: resp.insertId });
  } catch (error) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "saveUser",
      msg: { error },
    });
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users");
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Get user from data base",
      msg: "User from data base success",
    });
    return res.status(200).json(result);
  } catch (error) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Get user from data base",
      msg: "cant get user from data base",
    });
    return res.status(500).json({ error });
  }
};
