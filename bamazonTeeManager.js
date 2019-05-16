require("dotenv").config();
var mysql = require ("mysql");
var inquirer = require ("inquirer");

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
    console.log ("Loading Inventory")

});
function showInventory(){
    // connection.query("SELECT * FROM products", function(err,res){
    //     if (err) throw err;
    //     res.forEach(value => {
    //         console.log("ID: " + value.item_id);
    //         console.log("Name: " + value.product_name);
    //         console.log("Department: " + value.department_name);
    //         console.log("Price: " + value.price);
    //         console.log("Stock: " + value.stock_quantity);
    //         console.log("\n-------------------------\n")
            
    //     });
    // })
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        res.forEach((value)=>{
            var data= [ 
                value.item_id,
                value.product_name,
                value.department_name,
                value.price,
                value.stock_quantity
            ]
            table.push(data);
        });
        console.log(table.toString());
        console.log();

    })
}
showInventory();
   


var itemsForSale = function(){
    inquirer
    .prompt({
        message: "What is left in stock?"
    })
}
itemsForSale();




// show inventory should update when a purchase is made
// table is still displaying double inventory

