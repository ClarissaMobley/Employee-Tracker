const express = require("express");
const inquirer = require("inquirer");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool({
  user: "",
  password: "",
  host: "localhost",
  database: "employees_db",
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to emplyees_db", err.message);
    return;
  }
  console.log("Connected to employees_db");
  mainMenu();
});

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
        "Quit"
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Departments":
          viewDeparments();
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
            pool.exit();
            break;
        default:
            console.log('Invalid');
            mainMenu();
      }
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
