require("dotenv").config();
var mysql = require ("mysql");
var inquirer = require ("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonTee"
});

connection.connect(function(err){
    if (err) throw err;
    console.log ("\nConnected");

});
// 