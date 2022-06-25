const mysql = require('mysql');

// mysql connection
var pool = mysql.createPool({
  // Option 1 [LOCAL DATABASE]: Use lines 6-10 (lines 13-17 should be commented out) 
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: true

  // Option 2 [CLOUD DATABASE]: Use lines 13-17 (lines 6-10 should be commented out)
  // host: process.env.MYSQL_CLOUD_HOST,
  // user: process.env.MYSQL_CLOUD_USER,
  // password: process.env.MYSQL_CLOUD_PASS,
  // port: process.env.MYSQL_PORT,
  // database: process.env.MYSQL_DB,
  // multipleStatements: true
});

module.exports = pool;
