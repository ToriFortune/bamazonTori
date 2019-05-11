DROP DATABASE IF EXISTS bamazon;
CREATE database bamazonTee;

USE bamazonTee;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity DECIMAL(10,4) NOT NULL,
  PRIMARY KEY (item_id)
);
