require('dotenv').config()
const mysql = require('mysql')
const data= process.env

const connection = mysql.createConnection({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database
})

connection.connect(error => {
    if (error) console.error("error in database connecting");
    else
    console.log("Successfully connected to the database.");
  });

  module.exports = connection