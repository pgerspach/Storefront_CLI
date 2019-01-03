var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
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
  let sqlQuery = "SELECT bamazon.departments.department_id, bamazon.departments.department_name, over_head_costs, bamazon.departments.department_name, SUM(bamazon.products.product_sales) As  product_sales FROM bamazon.departments LEFT JOIN bamazon.products ON bamazon.departments.department_name = bamazon.products.department_name GROUP BY department_id";
  
  connection.query(sqlQuery, function(err,sqlRes){
    for(let row of sqlRes){
      row.total_profit = (row.product_sales-row.over_head_costs).toFixed(2);
    }
    let output = table.table(makeArray(sqlRes));
    console.log(output);
  })
}
function createDep() {}

function makeArray(arr){
  let newArray = [];
  let n = 0;
  var keys = Object.keys(arr[0]);
  newArray.push(keys);
  for(let obj of arr){
    let innerArr = [];
    for(let key of keys){
      
      innerArr.push(obj[key])
    }
    newArray.push(innerArr);

    n++;
  }
  return newArray;
}
