import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);

    case "DELETE":
      return await deleteProduct(req, res);

    case "PUT":
      return await updateProduct(req, res);

    default:
      break;
  }
}

const getProduct = async (req, res) => {
  const { id } = req.query;
  const [resp] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
  return res.status(200).json(resp[0]);
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  await pool.query("DELETE FROM Users WHERE id =?", [id]);
  return res.status(204).json({});
};

const updateProduct = async (req, res) => {
  const { firstName, lastName, positionDesc } = req.body;

  try {
    const { id } = req.query;
    await pool.query(
      "UPDATE users SET firstName = ?, lastName = ?, positionDesc = ? WHERE id = ?",
      [firstName, lastName, positionDesc, id]
    );
    return res.status(204).json({});
  } catch (error) {
    console.log(error.message);
  }
};
