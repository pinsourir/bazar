-- Création de la base RADIUS
CREATE DATABASE IF NOT EXISTS radius;

-- Création de l'utilisateur applicatif
CREATE USER IF NOT EXISTS 'radius'@'localhost'
IDENTIFIED BY 'motdepassdb';

-- Attribution des droits
GRANT ALL PRIVILEGES ON radius.* TO 'radius'@'localhost';

FLUSH PRIVILEGES;
