const mysql = require("mysql2");

// Database connection logic
const connectDB = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the database and handle any errors
  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.stack);
      return;
    }
    console.log("Connected to the database");
  });
};

module.exports = { connectDB };
