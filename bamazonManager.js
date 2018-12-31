var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  managerDisplay();
});

function managerDisplay() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please choose an option below:",
        choices: [
          {
            name: "View Products for Sale",
            value: 1
          },
          {
            name: "View Low Inventory",
            value: 2
          },
          {
            name: "Add to Inventory",
            value: 3
          },
          {
            name: "Add New Product",
            value: 4
          }
        ]
      }
    ])
    .then(res => {
      switch (res.option) {
        case 1:
          productsForSale();
          break;
        case 2:
          lowInventory();
          break;
        case 3:
          addInventory();
          break;
        case 4:
          addProduct();
          break;
        default:
          productsForSale();
          break;
      }
    });
}

function productsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
function lowInventory() {
  connection.query(
    "SELECT * FROM products WHERE stock_quantity < ?",
    ["5"],
    function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    }
  );
}
function addInventory() {
  connection.query(
    "SELECT item_id, product_name, stock_quantity FROM products",
    function(err, res) {
      if (err) throw err;
      let pNameChoiceArr = [];
      for (let name of res) {
        pNameChoiceArr.push({
          name: name.product_name,
          value: name.item_id
        });
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "pChoice",
            choices: pNameChoiceArr,
            message: "For which item would you like to add inventory?"
          },
          {
            type: "input",
            name: "pAmt",
            message: "How many units would you like to add?",
            validate(response) {
              return !isNaN(response) ? true : false;
            }
          }
        ])
        .then(inqRes => {
          connection.query(
            "SELECT stock_quantity FROM products WHERE item_id = ?",
            [inqRes.pChoice],
            (err, sqlRes) => {
              if (err) throw err;
              connection.query("UPDATE products SET ? WHERE ?", [
                {
                  stock_quantity:
                    sqlRes[0].stock_quantity + parseInt(inqRes.pAmt)
                },
                {
                  item_id: inqRes.pChoice
                }
              ]);
              connection.end();
            }
          );
        });
    }
  );
}
function addProduct() {
  inquirer
    .prompt([
      {
        name: "product_name",
        type: "input",
        message: "Product Name?"
      },
      {
        name: "department_name",
        type: "input",
        message: "Department Name?"
      },
      {
        name: "price",
        type: "input",
        message: "Price?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "Amount?"
      }
    ])
    .then(inqRes => {
      let mySqlQuery = "INSERT INTO products (product_name, department_name,price,stock_quantity) VALUES (?, ?, ?, ?)";
      connection.query(
        mySqlQuery,
        [
          inqRes.product_name,
          inqRes.department_name,
          inqRes.price,
          inqRes.stock_quantity
        ],
        (err) => {
            if(err) throw err;
            connection.end();
        }
      );
    });
}
