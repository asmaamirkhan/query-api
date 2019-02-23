var express = require("express");
var router = express.Router();
var db_conn = require("./sql_conn");
var res_fun = require("./response_func");

/*router.post("/sql", function(req, res) {
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
});

/*router.post("/signup", function(req, res) {
  bcrypt.hash(req.body.password, 12, function(err, hash) {
    console.log(hash.length);
    if (err) throw err;
    let sql = "insert into users (user_id,email, password) values (NULL,?,?)";
    connection.query(sql, [req.body.email, hash], function(
      error,
      results,
      fields
    ) {
      if (error) res.end(JSON.stringify({ status: "failed" }));
      res.end(JSON.stringify({ status: "success" }));
    });
  });
});*/

module.exports = router;
