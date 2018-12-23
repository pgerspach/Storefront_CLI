CREATE  DATABASE bamazon;

USE bamazon;
CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Electric Razor', "Health and Beauty", 44.99, 104);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Samsung 4K TV', "Electronics", 1999.99, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Keurig Coffee Maker', "Kitchen Appliances", 49.99, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Ray-Ban Sunglasses', "Clothing Accessories", 199.99, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Martha Stewart Cookbook', "Books", 17.99, 78);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nike Pro Leggings', "Fitness Clothing", 54.99, 86);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Red Dead Redemption 2', "Video Games", 59.99, 61);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bamazon Becho', "Electronics", 149.99, 97);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Proactiv Acne Treatment', "Health and Beauty", 22.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lego Harry Potter Hogwarts Set', "Toys and Games", 45.99, 29);

