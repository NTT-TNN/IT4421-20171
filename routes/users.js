var express = require('express');
var multer  = require('multer');
var user = require("../model/user.js");
var passport=require('passport');
var authen = require("../routes/authen.js");
var schedule = require("../model/Schedule.js");
var timekeeping = require("../model/Timekeeping.js");
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
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    return res.redirect("/users/user_info");

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

router.get("/user_info",authen.isLoggedIn,function (req,res) {
    // console.log(req.user[0].iduser);
    user.getUser(req.user[0].iduser,null,function(err,results){
      // console.log(results);
      res.render("user_info",{user:results});
    });

});

router.get("/LichLamViec",authen.isLoggedIn,function (req,res) {
    // console.log(req.user[0].iduser);
    user.getUser(req.user[0].iduser,null,function(err,user){
      schedule.getSchedule(req.user[0].iduser,function(err,days){
        timekeeping.getTotalWorkedDay(req.user[0].iduser,function(err,total){
          timekeeping.getTimekeepingByID(req.user[0].iduser,function(err,worked_day){
            res.render("lichlamviec",{
              user: user,
              days: days,
              total: total,
              worked_day: worked_day
            });
          });
          // console.log(total);

        });
      });
    });

});

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/users/user_info',
  failureRedirect: '/',
  failureFlash: true,
}))


router.post('/user_info', function(req, res) {
  console.log(req.body);
  user.updateUser(req.body,null,function(err,results){
    // console.log(results);
  });
  res.redirect("/users/user_info");
  // console.log(data);
  // user.getUser(req.user[0].iduser,null,function(err,results){
  //   res.render("user_info",{user:results});
  // });
});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})

module.exports = router;
