const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

//database connection pool
const dbPool = mysql.createPool({
    connectionLimit: 10, //연결의 개수(풀의 갯수)
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug: false,
});

module.exports = dbPool;
