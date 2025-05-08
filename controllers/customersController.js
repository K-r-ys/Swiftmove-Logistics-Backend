// Get all customers
const getAllCustomers = (req, res, next) => {
  const db = req.app.get("db");
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new customer
const createCustomer = (req, res, next) => {
  const { name, email, phone } = req.body;
  const db = req.app.get("db");
  const sql = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) return next(err);
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      phone,
    });
  });
};

// Update a customer by ID
const updateCustomer = (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?";
  db.query(sql, [name, email, phone, id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer updated successfully" });
  });
};

// Delete a customer by ID
const deleteCustomer = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  db.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  });
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
