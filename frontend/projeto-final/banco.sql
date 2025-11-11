CREATE DATABASE ecotasks;
USE ecotasks;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  categoria VARCHAR(50),
  status BOOLEAN DEFAULT false
);

INSERT INTO tarefas (titulo, categoria, status) VALUES 
('Separar lixo reciclável', 'reciclagem', false),
('Desligar luzes ao sair', 'economia', true),
('Usar garrafa reutilizável', 'meio ambiente', false);