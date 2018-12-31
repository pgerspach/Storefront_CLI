CREATE  DATABASE bamazon;


USE bamazon;
CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (50),
    department_name VARCHAR
    (50),
    price DECIMAL
    (8,2),
    stock_quantity INT,
    product_sales DECIMAL
    (10,2) DEFAULT 0,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Electric Razor', "Health and Beauty", 44.99, 104),
        ('Samsung 4K TV', "Electronics", 1999.99, 23),
        ('Keurig Coffee Maker', "Kitchen Appliances", 49.99, 52),
        ('Ray-Ban Sunglasses', "Clothing - A", 199.99, 33),
        ('Martha Stewart Cookbook', "Books", 17.99, 78),
        ('Nike Pro Leggings', "Clothing - Fitness", 54.99, 86),
        ('Red Dead Redemption 2', "Video  Games", 59.99, 61),
        ('Bamazon Becho', "Electronics", 149.99, 97),
        ('Proactiv Acne Treatment', "Health and Beauty", 22.99, 40),
        ('Lego Harry Potter Hogwarts Set', "Toys and Games", 45.99, 29);

    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name VARCHAR
        (50),
    over_head_costs DECIMAL
        (10,2) DEFAULT 0,
    PRIMARY KEY
        (department_id)
);

        INSERT bamazon.departments
            (department_name)
        SELECT DISTINCT department_name
        FROM bamazon.products;
