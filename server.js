const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

// Connect to pool and start main menu
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to emplyees_db", err.message);
    return;
  }
  console.log("Connected to employees_db");
  mainMenu();
});

// Main menu function and choices
function mainMenu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add An Employee",
        "Update An Employee Role",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee Role":
          updateEmployee();
          break;
        case "Quit":
          console.log("Bye!");
          process.exit();
        default:
          console.log("Invalid");
          mainMenu();
      }
    });
}

// View All Deparments Function
function viewDepartments() {
  pool.query("SELECT * FROM department", (err, res) => {
    if (err) {
      console.error("Error executing query", err.message);
      return mainMenu();
    }
    console.table(res.rows);
    mainMenu();
  });
}

// View All Roles Departments
function viewRoles() {
  pool.query("SELECT * FROM role", (err, res) => {
    if (err) {
      console.error("Error executing query", err.message);
      return mainMenu();
    }
    console.table(res.rows);
    mainMenu();
  });
}

// View All Employees Function
function viewEmployees() {
  pool.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.error("Error executing query", err.message);
      return mainMenu();
    }
    console.table(res.rows);
    mainMenu();
  });
}

// Add a Department function
function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "Enter the new department name",
    })
    .then((answer) => {
      const psql = "INSERT INTO department (name) VALUES ($1)";
      const values = [answer.newDepartment];

      pool.query(psql, values, (err, res) => {
        if (err) {
          console.error("Error executing query", err.message);
        } else {
          console.log(`Department ${answer.newDepartment} added successfully.`);
        }
        mainMenu();
      });
    });
}

// Add a Role function
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter a title for new role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter a salary for new role:",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter the department ID:",
      },
    ])
    .then((answer) => {
      const psql =
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
      const values = [
        answer.title,
        parseFloat(answer.salary),
        parseInt(answer.department_id),
      ];

      pool.query(psql, values, (err, res) => {
        if (err) {
          console.error("Error executing query", err.message);
        } else {
          console.log(
            `New role ${answer.title}, ${answer.salary}, ${answer.department_id} added successfully`
          );
        }
        mainMenu();
      });
    });
}

function addEmployee() {}

function updateEmployee() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
