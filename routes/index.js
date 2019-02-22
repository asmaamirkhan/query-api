var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var connection = mysql.createConnection({
  host: "localhost",
  user: "server",
  password: "1234",
  database: "query_system"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
    res.end(JSON.stringify(err));
  }
  console.log("connected to DB");
});

function verify(req, res, next) {
  jwt.verify(req.headers["x-access-token"], "ESMA", function(err, decoded) {
    if (err) {
      res.end(JSON.stringify({ status: "invalid token" }));
    }
    console.log(decoded);
    next();
  });
}

router.post("/signup", function(req, res) {
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
});

router.post("/login", function(req, res) {
  let sql = "Select * from users where email=?";
  connection.query(sql, [req.body.email], function(error, results, fields) {
    if (error) res.end(JSON.stringify({ status: "failed" }));
    if (!results.length) {
      res.end(JSON.stringify({ status: "No email" }));
    } else {
      bcrypt.compare(req.body.password, results[0].password, function(
        err,
        equal
      ) {
        if (equal) {
          //res.end(JSON.stringify({ status: "Auth" }));
          var token = jwt.sign(
            {
              email: req.body.email,
              password: req.body.password
            },
            "ESMA",
            { expiresIn: "1h" }
          );
          res.end(JSON.stringify({ status: "auth", token: token }));
        } else {
          res.end(JSON.stringify({ status: "wrong input" }));
        }
      });
    }
  });
});

router.post("/sql", verify, function(req, res) {
  let query = req.body.sql;
  connection.query(query, function(error, results) {
    if (error) res.end(JSON.stringify({ status: error }));
    else {
      if (!results.length) res.end(JSON.stringify({ status: "Done" }));
    }
    res.end(JSON.stringify({ status: "Done", records: results }));
  });
});

module.exports = router;
