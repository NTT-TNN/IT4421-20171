var express = require('express');
var multer  = require('multer');
var user = require("../model/user.js");
var passport=require('passport');
var authen = require("../routes/authen.js");
// var bodyParser = require('../model/body-parser')
var router = express.Router()
router.use(express.static("public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

router.post('/uploadsAvatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    const host = req.host;
    // const filePath =req.file.path.subString(12);
    console.log("iduser");
    console.log(req.body);
    var filePath=req.file.path.slice(7);
    console.log(filePath);
    // console.log(test.slice(7));
    user.updateAvatar(filePath,req.body.iduser,function(err,result){
      if(err) throw err;
      // console.log(filePath);
      console.log('file received');
      return res.redirect("/users/user_info");
    })

  }
});

router.get('/',authen.isLoggedIn, function(req, res, next) {
  console.log(req.user[0].iduser);
  user.getUSer(req.user[0].iduser,null,function(err,results){
    // console.log(results);
    console.log(results);
    res.render("user_info",{user:results});
  });
});

router.get("/user_info",authen.isLoggedIn,function (req,res) {
    console.log(req.user[0].iduser);
    user.getUSer(req.user[0].iduser,null,function(err,results){
      console.log(results);
      res.render("user_info",{user:results});
    });

});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/users/',
  failureRedirect: '/',
  failureFlash: true,
}))


router.post('/user_info', function(req, res) {
  // console.log(req.body);
  data = {
    fullname: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday,
    email: req.body.email,
    phonenumber: req.body.phone,
    type: req.body.position,
    add: req.body.diachi
  };
  console.log(req.body);
  user.updateUser(req.body,null,function(err,results){
    // console.log(results);
  });

  // console.log(data);
  user.getUSer(req.user[0].iduser,null,function(err,results){
    res.render("user_info",{user:results});
  });
});

router.get('/logout',function(req,res){
  req.logout();
  // login=false;
  res.redirect('/');
})

module.exports = router;
