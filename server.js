const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool({
  user: "",
  password: "",
  host: "local host",
  database: "employees_db",
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to emplyees_db', err.message);
        return;
    }
    console.log('Connected to employees_db');
});
