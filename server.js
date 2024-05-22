const express = require("express");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
  {
    user: "",
    password: "",
    host: "local host",
    database: "employees_db",
  },
  console.log("Connected to the employees_db")
);

pool.connect();
