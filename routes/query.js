var db_conn = require("./sql_conn");
var res_fun = require("./response_func");
function sql_query(req, res){
    let query = req.body.sql;
  db_conn.query(query, function(error, results) {
    if (error)
      res.json(
        res_fun.failure_func("failed", error, "An error occurred in db")
      );
    else if (!results.length) {
      res.json(
        res_fun.success_func(
          "success",
          "",
          "The operation is done successfully"
        )
      );
    } else
      res.json(
        res_fun.success_func(
          "success",
          results,
          "The operation is done successfully"
        )
      );
  });
}
module.exports = sql_query;