import { pool } from "../../../config/db";
import { logger } from "../../../lib/logger/logger";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getUser(req, res);

    case "DELETE":
      return await deleteUser(req, res);

    case "PUT":
      return await updateUser(req, res);

    default:
      break;
  }
}

const getUser = async (req, res) => {
  const { id } = req.query;
  const [resp] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
  logger.info({
    userIp: req.headers["x-forwarded-for"],
    action: "Get user with id",
    msg: "success",
  });
  return res.status(200).json(resp[0]);
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  await pool.query("DELETE FROM Users WHERE id =?", [id]);
  logger.info({
    userIp: req.headers["x-forwarded-for"],
    action: "Get user with id",
    msg: "User deleted successfully",
  });
  return res.status(204).json({});
};

const updateUser = async (req, res) => {
  const { firstName, lastName, positionDesc } = req.body;

  try {
    const { id } = req.query;
    await pool.query(
      "UPDATE users SET firstName = ?, lastName = ?, positionDesc = ? WHERE id = ?",
      [firstName, lastName, positionDesc, id]
    );
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Get user with id",
      msg: "user update",
    });
    return res.status(204).json({});
  } catch (error) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Get user with id",
      msg: "can't update user",
    });
  }
};
