var jwt = require("jsonwebtoken");
var res_fun = require("./routes/response_func");
function is_auth(req, res, next) {
  if (req.originalUrl != "/login") {
    jwt.verify(req.headers["x-access-token"], "ESMA", function(err, decoded) {
      if (err) {
        res.json(res_fun.failure_func("failed", req.body, "Invalid token"));
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    next();
  }
}

module.exports = is_auth;
