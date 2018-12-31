var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");
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
  displayAll();
});

function displayAll() {
  console.log("Selecting all products...\n");
  connection.query(
    "SELECT item_id,product_name, department_name, price FROM products",
    function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(table.table(makeArray(res)));
      numItems = res.length;
      promptUser();
    }
  );
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Product ID?",
        name: "productID",
        validate(response) {
          return response <= numItems && response > 0 ? true : false;
        }
      }
    ])
    .then(res => {
      let pID = res.productID;
      inquirer
        .prompt([
          {
            type: "input",
            message: "How Many?",
            name: "quantity",
            validate(response) {
              return !isNaN(response) ? true : false;
            }
          }
        ])
        .then(res => {
          connection.query(
            "SELECT stock_quantity, price, product_sales FROM products WHERE item_id = ?",
            [pID],
            function(err, qRes) {
              if (err) throw err;
              if (res.quantity > qRes["stock_quantity"]) {
                console.log("NOT ENOUGH LEFT!");
              } else {
                console.log(
                  `We've got plenty! You asked for ${
                    res.quantity
                  } and we have ${qRes[0].stock_quantity}`
                );
                connection.query("UPDATE products SET ?, ? WHERE ?", [
                  {
                    stock_quantity: qRes[0].stock_quantity - res.quantity
                  },
                  {
                    product_sales: qRes[0].product_sales + qRes[0].price * res.quantity
                  },
                  {
                    item_id: pID
                  }
                ]);
              }
              // let cost = res.quantity*qRes[0].price;
              console.log(
                `Your purchase will cost ${res.quantity * qRes[0].price}`
              );
              //   displayAll();
              connection.end();
            }
          );
        });
    });
}

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