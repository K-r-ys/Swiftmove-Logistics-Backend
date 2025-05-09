const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Load .env variables
const cors = require("cors"); // Import CORS package
const logger = require("./logger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Initialize Express app
const app = express();

// Enable CORS for all routes with custom headers
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

app.use(express.json()); // Middleware to parse JSON

// Swagger definition using swagger-jsdoc
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SwiftMove Logistics API",
    description: "API documentation for SwiftMove Logistics",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI at '/api-docs' endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Access environment variables from .env file
const PORT = process.env.PORT || 5000;

// Log the MYSQL_URL to verify it's correct
console.log("MYSQL_URL =", process.env.MYSQL_URL);

// Set up the database connection using the MYSQL_URL
const db = mysql.createConnection(process.env.MYSQL_URL);

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application if connection fails
  }
  console.log("Database connected successfully");
});

// Routes (use swagger-jsdoc for documentation)
const driversRouter = require("./routes/drivers");
const customersRouter = require("./routes/customers");
const ordersRouter = require("./routes/orders");
const paymentsRouter = require("./routes/payments");
const communicationsRouter = require("./routes/communications");
const driverPerformanceRouter = require("./routes/driverPerformance");

app.use("/api/drivers", driversRouter);
app.use("/api/customers", customersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/communications", communicationsRouter);
app.use("/api/driver-performance", driverPerformanceRouter);

// Test error route to trigger logging
app.get("/test-error", (req, res) => {
  const error = new Error("Test error for logging");
  logger.error(error.message); // Log the error using Winston
  res.status(500).json({ message: "An error occurred" });
});

// Default route
app.get("/", (req, res) => {
  res.send("SwiftMove Logistics API is running");
});

// Error handling middleware (after all routes)
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
