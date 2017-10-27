var express = require('express');
var db = require("../model/config.js");


var router = express.Router();

db(function (err, con) {
  if(err) {
    throw (err);
  }
  router.get("/",function (req,res) {
      con.query("SELECT * FROM Products", function (err, results, fields) {
        if (err) throw err;
        console.log(results);
        res.render("menu",{products:results});
      });

  });
});

module.exports = router;
