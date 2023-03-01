const mysql = require("mysql2");
require('dotenv').config()
const connection = require("knex")({
    client: "mysql2",
    connection: {
      connectionLimit:20,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password:process.env.DB_PASSWORD
    },
  })
  connection.raw("select 1").then(()=>
 {
  console.log("Database connected");
 }).catch((e)=>
 {
  console.log(`The Database not connected \n ${e}`);
 })
 connection.raw("show status where `variable_name` = 'Threads_connected'")
 .then((val)=>
 {
   console.log(`Connections connected `+val[0][0].Value);
 }).catch((err)=>
 {
   console.log(err);
 })

module.exports = connection;