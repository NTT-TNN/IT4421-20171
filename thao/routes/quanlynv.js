var express=require('express');
var router = express.Router();
var user = require("../model/user.js");
var authen = require("../routes/authen.js");
router.use(express.static("public"));

// router.get("/",function(req,res){
//   res.render("quanlynv");
// });
// router.post('/add_emp', function(req, res) {
//   // console.log("abc");
//   user.insertEmployee(req.body,null, (result) => { //truyen vao mot dinh nghia ham
//         console.log(result);
//   });
//   res.send();

// });
// router.post('/edit_emp', function(req, res) {
//   user.updateEmployee(req.body,null, (result) => { //truyen vao mot dinh nghia ham
//         console.log(result);
//   });
//   res.send();

// });



module.exports = router;
