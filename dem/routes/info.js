var express = require('express');
var db = require("../model/sql.js");

// var bodyParser = require('../model/body-parser')
var router = express.Router()

db(function (err, con) {
  if(err) {
    throw (err);
  }
  router.get("/",function (req,res) {
      con.query("SELECT * FROM user", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
        res.render("user_info",{user:results});
      });
  });
});

module.exports = router;
