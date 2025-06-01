CREATE DATABASE apptareas;

USE apptareas;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
    
);

CREATE TABLE tareas (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE tareas
ADD PRIMARY KEY (id);

ALTER TABLE tareas
MODIFY id INT(11) NOT NULL AUTO_INCREMENT ;

DESCRIBE tareas;