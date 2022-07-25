const mysql = require("mysql2");
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Open the connection to MySQL server
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
});

// Run create database statement
connection.query(
    `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`,
    function (err, results) {
        if(err){
            console.log("database error: " + err);
        }
        console.log("database created successfully");
    }
);


// Close the connection
connection.end();