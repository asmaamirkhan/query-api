var mysql = require("mysql");
var res_fun = require("./response_func");
var connection = mysql.createConnection({
  host: "localhost",
  user: "server",
  password: "1234",
  database: "query_system"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
    res.json(res_fun.failure_func("failed", err, "Could not access database"));
  }
  console.log("connected to DB");
});

module.exports = connection;
