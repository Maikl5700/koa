CREATE DATABASE IF NOT EXISTS baza;

USE baza;

CREATE TABLE IF NOT EXISTS BOOKS (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(50),
    date DATE
);

CREATE TABLE IF NOT EXISTS AUTHORS (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS AUTHORS_BOOKS (
    author_id INT(11) NOT NULL,
    book_id INT(11) NOT NULL
);

