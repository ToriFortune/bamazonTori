require("dotenv").config();
var mysql = require ("mysql");
var inquirer = require ("inquirer");


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
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        res.forEach(value => {
            console.log("ID: " + value.item_id);
            console.log("Name: " + value.product_name);
            console.log("Department: " + value.department_name);
            console.log("Price: " + value.price);
            console.log("Stock: " + value.stock_quantity);
            console.log("\n-------------------------\n")
            
        });
    })
}
showInventory();

// function showAllProducts(){
//     connection.query("SELECT * FROM products", function(err, res){
//         if (err) throw err;

//         res.forEach((value) => {
//             console.log("ID: " + value.item_id);
//             console.log("Name: " + value.product_name);
//             console.log("Department: " + value.department_name);
//             console.log("Price: " + value.price);
//             console.log("Stock: " + value.stock_quantity);
//             console.log("\n-------------------------\n")
//         });
//         console.log(res);
//     })
// }
// var Table = require('cli-table');
 
// // instantiate
// var table = new Table({
//     head: ["ID", "Product name", "Department", "Price", "In Stock"]
//   , colWidths: [5, 20, 20, 10, 15]
// });
// table.push(
//     ["First value", "Second value", "Third Value", "Fourth Value"]
//   , ["First value", "Second value", "Third Value", "Fourth Value"]
// );
 
// console.log(table.toString());
// console.log()


// var purchases = function() {
//     inquirer
//       .prompt({
//          type: "input",
//          name: "productpurchased",
//           message: "What would you like to purchase today?"
//       })
//       .then(function(response) {
//         var selection = response.productpurchased;
//         connection.query("SELECT * FROM products WHERE Id=?", selection, function(
//           err,
//           res
//         ) {
//           if (err) throw err;
//           if (res.length === 0) {
//             console.log(
//               "Sorry we don't have that in stock"
//             );
//             purchases();
//           }

//           else {
//             inquirer
//               .prompt({
//                type: "input", 
//                name: "Amount",
//                                 message: "How many would you like today?"
//               })
//               .then(function(response2) {
//                 var quantity = response2.quantity;
//                 if (quantity > res[0].stock_quantity) {
//                   console.log(
//                     "Sorry we only have " +
//                       res[0].stock_quantity +
//                       " of that product :("
//                   );
                  
//                   shopping();
//                 }
  
//                 else {
                
//                     console.log(res[0].product_name + " purchased");
//                     console.log(quantity + " qty for $" + res[0].price);
    
//                     var newQuantity = res[0].stock_quantity - quantity;
//                     connection.query(
//                       "UPDATE products SET stock_quantity = " +
//                         newQuantity +
//                         " WHERE id = " +
//                         res[0].id,
//                       function(err, resUpdate) {
//                         if (err) throw err;
                       
//                         console.log("Your Order has been Processed");
//                         console.log("Thank you for Shopping at Bamazon!");
//                         ;
//                         connection.end();
//                       }
//                     );
//                   }
//                 });
//             }
//           });
//         });
//     };
    
//     showAllProducts();
    
              
// // create variable for shopping and call for inquirer 
// // function purchases(){
// //     const prompt =[
// //         type="input",
// //         message ="What would you like to buy",
// //         name = "product"
// // //     ]
// // // }
// // 





