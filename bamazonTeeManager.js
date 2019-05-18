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
function updateInventory(){
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
updateInventory();
    })
}
updateInventory();
   


var updateInventory = function(){
    inquirer
    .prompt({
        name: "action",
        type:"list",
        message:"What would you like to do today?",
        choices: ["Restock Items", "Add new item/s to stock", "Remove item from stock"]
    }).then(function(response){
        switch(response.action){
            case "Restock Items":
                restockItems();
                break;
            case "Add new item/s":
                addItems();
                break;
            case "Remove item from stock":
                removeItems();
                break;
        }
    })
}
function restockItems(){
    inquirer.prompt([{
        name: "item_id",
        type:"input",
        message:"What number item would you like to restock?",
    },
    {
        name: "Amount",
        type: "input",
        message: "How many would you like to add?",
    },
    
]).then(function(response){
var amountAdded =response.amount;
var itemId = response.item_id;
restockInventory (itemId, amountAdded);

})
    
};
function restockInventory(item_id, amount){
    console.log(item_id)
connection.query("SELECT * FROM products WHERE item_id=?" + item_id, function (err, res){
    if (err) console.log(err)
});
connection.query ("UPDATE products SET amount = amount +" + amountAdded + "WHERE item_id = ?" + item_id );
displayInventory();

};
