const http = require("http");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "195.201.114.229",
  user: "anas",
  password: "anas1",
  database: "anas",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
