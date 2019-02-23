const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db_conn = require("./sql_conn");
var res_fun = require("./response_func");
function login(req, res) {
  let sql = "Select * from users where email=?";
  db_conn.query(sql, [req.body.email], function(error, results) {
    if (error)
      res.json(
        res_fun.failure_func("failed", error, "An error occurred in db")
      );
    if (!results.length) {
      res.json(res_fun.failure_func("failed", req.body, "No email"));
    } else {
      bcrypt.compare(req.body.password, results[0].password, function(
        err,
        equal
      ) {
        if (equal) {
          var token = jwt.sign(
            {
              email: results[0].user_id
            },
            "ESMA",
            { expiresIn: "1h" }
          );
          res.json(res_fun.success_func("success", token, "Auth"));
        } else {
          res.json(res_fun.failure_func("failed", req.body, "Not auth"));
        }
      });
    }
  });
}
module.exports = login;
