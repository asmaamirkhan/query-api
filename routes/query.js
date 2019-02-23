var db_conn = require("./sql_conn");
var res_fun = require("./response_func");
var sha256 = require("sha256");

function sql_query(req, res) {
  let query = req.body.sql;
  let safe = req.headers["x-access-token"] + "MY_SECRET_KEY" + req.body.sql;
  console.log(safe);
  console.log(sha256(safe));
  safe = sha256(safe);
  if (req.body.hash == safe) {
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
  } else {
    res.json(res_fun.failure_func("failed", req.body, "Package has changed"));
  }
}
module.exports = sql_query;
