var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "CK214227275524@",
  database: "bamazon"
});
var numItems = 0;

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayOptions();
});

function displayOptions() {
  inquirer
    .prompt([
      {
        name: "superOption",
        type: "list",
        message: "Choose an option below:",
        choices: [
          {
            name: "View Product Sales by Department",
            value: 0
          },
          {
            name: "Create New Department",
            value: 1
          }
        ]
      }
    ])
    .then(inqRes => {
      switch (inqRes.superOption) {
        case 0:
          viewSales();
          break;
        case 1:
          console.log("1");
          createDep();
          break;
      }
      connection.end();
    });
}

function viewSales() {
    
}
function createDep() {}
