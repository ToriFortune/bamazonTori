const mysql = require ("mysql");
var inquirer = require ("inquirer");
require('dotenv').config()


var Table = require('cli-table');
var table = new Table({
    head: ["ID", "Product name", "Department", "Price", "In Stock"]
  , colWidths: [10, 20, 20, 10, 15]
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "bamazonTee"
});

connection.connect(function(err){
    if (err) throw err;
    console.log ("\nConnected as id " + connection.threadId);
    showAllProducts();

});

function showAllProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        res.forEach((value) => {
            var data = [
                value.item_id,
                value.product_name,
                value.department_name,
                value.price,
                value.stock_quantity
            ]
            //add data rows to table
            table.push(data);
        });

        //display table
        console.log(table.toString());
        console.log();

        //begin inquirer
        purchases();
    })
}



var purchases = function() {
    inquirer
      .prompt({
         type: "input",
         name: "productpurchased",
          message: "What would you like to purchase today?"
      })
      .then(function(response) {
        var selection = response.productpurchased;
        connection.query("SELECT * FROM products WHERE item_id=?", selection, function(
          err,
          res
        ) {
          if (err) throw err;
          if (res.length === 0) {
            console.log(
              "Sorry we don't have that in stock"
            );
            purchases();
          }

          else {
            inquirer
              .prompt({
               type: "input", 
               name: "quantity",
               message: "How many would you like today?"
              })
              .then(function(response2) {
                var quantity = response2.quantity;
                if (quantity > res[0].stock_quantity) {
                  console.log(
                    "Sorry we only have " +
                      res[0].stock_quantity +
                      " of that product :("
                  );
                  
                  purchases();
                }
  
                else {
                
                    console.log(res[0].product_name + " purchased");
                    console.log(quantity + " qty for $" + res[0].price);
    
                    var newQuantity = res[0].stock_quantity - quantity;
                    connection.query(
                      "UPDATE products SET ? WHERE ?",
                        [
                            { stock_quantity: newQuantity },
                            { item_id: res[0].item_id}
                        ],
                      function(err) {
                        if (err) throw err;
                      //  resUpdate();
                        console.log("Your order has been processed.");
                        console.log("Thank you for Shopping at BamazonTee! We hope you would visit us again!");
                        ;
                        // end connection
                        connection.end();
                      }
                    );
                  }
                  // resUpdate();
                });
            }
          });
        });
    };