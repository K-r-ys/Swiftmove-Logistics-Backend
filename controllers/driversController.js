// controllers/driversController.js

// Get all drivers
const getAllDrivers = (req, res, next) => {
  const db = req.app.get("db");
  const sql = "SELECT * FROM drivers";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new driver
const createDriver = (req, res, next) => {
  const { name, contact, license_number, vehicle_assigned, email } = req.body;
  const db = req.app.get("db");
  const sql =
    "INSERT INTO drivers (name, contact, license_number, vehicle_assigned, email) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, contact, license_number, vehicle_assigned, email],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({
        id: result.insertId,
        name,
        contact,
        license_number,
        vehicle_assigned,
        email,
      });
    }
  );
};

// Update a driver by ID
const updateDriver = (req, res, next) => {
  const { id } = req.params;
  const { name, contact, license_number, vehicle_assigned, email } = req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE drivers SET name = ?, contact = ?, license_number = ?, vehicle_assigned = ?, email = ? WHERE id = ?";

  db.query(
    sql,
    [name, contact, license_number, vehicle_assigned, email, id],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.json({ message: "Driver updated successfully" });
    }
  );
};

// Delete a driver by ID
const deleteDriver = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const sql = "DELETE FROM drivers WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver deleted successfully" });
  });
};

module.exports = {
  getAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
};
