import { pool } from "../../../config/db";

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
    console.log(resp);
    return res
      .status(200)
      .json({ firstName, lastName, positionDesc, id: resp.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error });
  }
};
