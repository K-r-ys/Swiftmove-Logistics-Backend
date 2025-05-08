// controllers/ordersController.js

// Get all orders
const getAllOrders = (req, res, next) => {
  const db = req.app.get("db");
  const sql = "SELECT * FROM orders";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new order
const createOrder = (req, res, next) => {
  const {
    customer_id,
    driver_id,
    package_details,
    order_date,
    delivery_date,
    status,
  } = req.body;
  const db = req.app.get("db");
  const sql =
    "INSERT INTO orders (customer_id, driver_id, package_details, order_date, delivery_date, status) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      customer_id,
      driver_id,
      package_details,
      order_date,
      delivery_date,
      status,
    ],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({
        id: result.insertId,
        customer_id,
        driver_id,
        package_details,
        order_date,
        delivery_date,
        status,
      });
    }
  );
};

// Update an order by ID
const updateOrder = (req, res, next) => {
  const { id } = req.params;
  const {
    customer_id,
    driver_id,
    package_details,
    order_date,
    delivery_date,
    status,
  } = req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE orders SET customer_id = ?, driver_id = ?, package_details = ?, order_date = ?, delivery_date = ?, status = ? WHERE id = ?";

  db.query(
    sql,
    [
      customer_id,
      driver_id,
      package_details,
      order_date,
      delivery_date,
      status,
      id,
    ],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order updated successfully" });
    }
  );
};

// Delete an order by ID
const deleteOrder = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const sql = "DELETE FROM orders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  });
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
