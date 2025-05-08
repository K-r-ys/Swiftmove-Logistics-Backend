// controllers/paymentsController.js

// Get all payments
const getAllPayments = (req, res, next) => {
  const db = req.app.get("db");
  const sql = "SELECT * FROM payments";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new payment
const createPayment = (req, res, next) => {
  const { order_id, amount, payment_method, status, transaction_date } =
    req.body;
  const db = req.app.get("db");
  const sql =
    "INSERT INTO payments (order_id, amount, payment_method, status, transaction_date) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [order_id, amount, payment_method, status, transaction_date],
    (err, result) => {
      if (err) return next(err);

      res.status(201).json({
        id: result.insertId,
        order_id,
        amount,
        payment_method,
        status,
        transaction_date,
      });
    }
  );
};

// Update payment by ID
const updatePayment = (req, res, next) => {
  const { id } = req.params;
  const { order_id, amount, payment_method, status, transaction_date } =
    req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE payments SET order_id = ?, amount = ?, payment_method = ?, status = ?, transaction_date = ? WHERE id = ?";

  db.query(
    sql,
    [order_id, amount, payment_method, status, transaction_date, id],
    (err, result) => {
      if (err) return next(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.status(200).json({ message: "Payment updated successfully" });
    }
  );
};

// Delete payment by ID
const deletePayment = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const sql = "DELETE FROM payments WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  });
};

module.exports = {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
