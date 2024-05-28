CREATE DATABASE Prueba02;

USE Prueba02;

CREATE TABLE heroesFav(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    powers VARCHAR(50) NOT NULL,
    weakness VARCHAR(50) NOT NULL,
    age INT

);

SELECT * FROM heroesFav;

CREATE USER 'prueba02'@'localhost' IDENTIFIED BY 'prueba02';
GRANT ALL PRIVILEGES ON Prueba02.* TO 'prueba02'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'prueba02'@'localhost';