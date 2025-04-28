function status(req, res) {
  res.status(200).json({ "message": "Essa e uma resposta do servidor" });
}

export default status;