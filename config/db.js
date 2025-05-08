const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the server if connection fails
  }
  console.log("Connected to the MySQL database");
});

module.exports = db;
