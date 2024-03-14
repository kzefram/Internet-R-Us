-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- USE DATABASE --
USE DATABASE ecommerce_db;

-- CREATE TABLES --
CREATE TABLE category (
    id              INT                 AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name            VARCHAR(50)         NOT NULL
);  

CREATE TABLE product (
    id              INT                 AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name            VARCHAR(50)         NOT NULL,
    price           DECIMAL(10, 2)      NOT NULL,
    stock           INT                 NOT NULL,
    category_id     INT                 NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE productTag (
    id              INT                 AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_id      INT                 NOT NULL,
    tag_id          INT                 NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

CREATE TABLE tag (
    id              INT                 AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tag_name        VARCHAR(50)         NOT NULL
);