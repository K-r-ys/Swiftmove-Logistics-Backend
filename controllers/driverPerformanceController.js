// controllers/driverPerformanceController.js

// Get all driver performance records
const getAllDriverPerformance = (req, res, next) => {
  const db = req.app.get("db");
  const sql = "SELECT * FROM driver_performance";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Create a new driver performance record
const createDriverPerformance = (req, res, next) => {
  const { driver_id, completed_trips, on_time_delivery_rate, fuel_efficiency } =
    req.body;
  const db = req.app.get("db");
  const sql =
    "INSERT INTO driver_performance (driver_id, completed_trips, on_time_delivery_rate, fuel_efficiency) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [driver_id, completed_trips, on_time_delivery_rate, fuel_efficiency],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({
        id: result.insertId,
        driver_id,
        completed_trips,
        on_time_delivery_rate,
        fuel_efficiency,
      });
    }
  );
};

// Update an existing driver performance record by ID
const updateDriverPerformance = (req, res, next) => {
  const { id } = req.params;
  const { driver_id, completed_trips, on_time_delivery_rate, fuel_efficiency } =
    req.body;
  const db = req.app.get("db");
  const sql =
    "UPDATE driver_performance SET driver_id = ?, completed_trips = ?, on_time_delivery_rate = ?, fuel_efficiency = ? WHERE id = ?";

  db.query(
    sql,
    [driver_id, completed_trips, on_time_delivery_rate, fuel_efficiency, id],
    (err, result) => {
      if (err) return next(err);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Driver performance record not found" });
      }
      res.json({ message: "Driver performance record updated successfully" });
    }
  );
};

// Delete a driver performance record by ID
const deleteDriverPerformance = (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get("db");
  const sql = "DELETE FROM driver_performance WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Driver performance record not found" });
    }
    res.json({ message: "Driver performance record deleted successfully" });
  });
};

module.exports = {
  getAllDriverPerformance,
  createDriverPerformance,
  updateDriverPerformance,
  deleteDriverPerformance,
};
