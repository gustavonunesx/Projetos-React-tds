import mysql from "mysql2/promise";


export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aluno", 
  database: "ecotasks"
});

console.log("Conectado ao banco de dados MySQL 'ecotasks'.");