import database from "../../../../infra/database.js";
async function status(req, res) {
  const result = await database.query('SELECT 1 + 1 as sum;')
  console.log(result.rows);
  res.status(200).json({ "message": "Essa e uma resposta do servidor" });
}

export default status;