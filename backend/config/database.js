const mysql = require("mysql2");
const dbConfig = require("./db.config");
const connection = require("knex")({
    client: "mysql2",
    connection: {
      connectionLimit:20,
      host: dbConfig.HOST,
      port: dbConfig.DB_PORT,
      user: dbConfig.USER,
      database: dbConfig.DB_NAME,
      password:dbConfig.PASSWORD
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