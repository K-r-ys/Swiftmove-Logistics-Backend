// controllers/communicationsController.js

// Get all communications
const getAllCommunications = (req, res, next) => {
  const db = req.app.get("db");
  const sql = "SELECT * FROM communications";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new communication
const createCommunication = (req, res, next) => {
  const { sender_name, message } = req.body;
  const db = req.app.get("db");
  const sql = "INSERT INTO communications (sender_name, message) VALUES (?, ?)";

  db.query(sql, [sender_name, message], (err, result) => {
    if (err) return next(err);
    res.status(201).json({
      id: result.insertId,
      sender_name,
      message,
    });
  });
};

// Update a communication by ID
const updateCommunication = (req, res, next) => {
  const { id } = req.params;
  const { sender_name, message } = req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE communications SET sender_name = ?, message = ? WHERE id = ?";

  db.query(sql, [sender_name, message, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Communication not found" });
    }
    res.json({ message: "Communication updated successfully" });
  });
};

// Delete a communication by ID
const deleteCommunication = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const sql = "DELETE FROM communications WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Communication not found" });
    }
    res.json({ message: "Communication deleted successfully" });
  });
};

module.exports = {
  getAllCommunications,
  createCommunication,
  updateCommunication,
  deleteCommunication,
};
