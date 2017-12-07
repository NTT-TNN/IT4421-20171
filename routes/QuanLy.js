var express = require('express');
var DonHang = require("../model/DonHang.js");
var user = require("../model/user.js");
var path = require('path');
var authen = require("../routes/authen.js");
var product = require("../model/Products.js");
var multer = require('multer');
var schedule = require("../model/Schedule.js");
var timekeeping = require("../model/Timekeeping.js");

var router = express.Router();
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage
})

router.use(express.static("public"));

router.get("/ThongKe", authen.isManager, function(req, res) {
  DonHang.getNumberProducts(null, null, function(err, results) {
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("thongke", {
        results: results,
        user: user
      });
    });
  });
});

router.get("/ChamCong", authen.isManager, function(req, res) {
  user.getAllUsers(null,null, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user){
      timekeeping.getTimekeeping(function(err,tk){
        timekeeping.getAllTotalWorkedDay(function(err,total){
          console.log(total);
          res.render("chamcong", {
            allUsers:result,
            user:user,
            timekeeping: tk,
            total: total
          });
        });
      });
    });
  });
});


router.get("/LapLich", authen.isManager, function(req, res) {
  user.getAllUsers(null, null, function(err, results) {
    user.getUser(req.user[0].iduser, null, function(err, user) {
      schedule.getAllSchedule(function(err,schedule){
        res.render("laplich", {
          allUsers: results,
          user: user,
          schedule: schedule
        });
      });
    });
  });
});

router.get("/TKNV", function(req,res){
  // console.log(req.query.datasearch);
  var position;
  user.getPosition(null,null , function(error,posi){
    position = posi;
  });
  user.searchUser(req.query.typeahead, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("quanlynv", {
        allUsers:result,
        user: user,
        position : position
      });
    });
  });
});
router.get("/searchUser" , function(req,res){
  user.complete(req.query.key, function(err,result){
    var data= [];
    for(i=0;i<result.length;i++)
    {
      data.push(result[i].fullname);
    }
    user.complete1(req.query.key,function(err,type){
      for(i=0;i<type.length;i++)
      {
          data.push(type[i].type);
      }
      console.log(data);
      res.send(JSON.stringify(data));
    });
  });
})

router.get("/TKSP", function(req,res){
  // console.log(req.query.datasearch);
  product.searchProduct(req.query.typeahead, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("quanlydouong", {
        products:result,
        user: user
      });
    });
  });
});

router.get("/searchProduct" , function(req,res){
  product.searchProduct(req.query.key, function(err,result){
    var data= [];
    for(i=0;i<result.length;i++)
    {
      data.push(result[i].ProductName);
    }
      console.log(data);
      res.send(JSON.stringify(data));
    });
  });



router.get("/QuanLyNhanVien", authen.isManager, function(req, res) {
  var position;
  user.getPosition(null,null , function(error,posi){
    // console.log("day la ket qua "+posi);
    position = posi;
  });
  user.getAllUsers(null,null, function(err,result){
    user.getUser(req.user[0].iduser, null, function(err, user) {
      res.render("quanlynv", {
        allUsers:result,
        user: user,
        position : position
      });
    });
  });
});

router.post("/deleteUser",function(req,res){
  console.log("id xoa " +req.body.userid);
  user.deleteUser(req.body.userid,function(err,result){
    console.log("delete thanh cong");
  });
});

router.post("/createSchedule",function(req,res){
  console.log(req.body);
  schedule.deleteSchedule(function(err,rs){
    var key =   Object.keys(req.body);
    for(var i = 0; i< key.length ; i++){
      var value = req.body[key[i]];
      if((typeof value) == "string"){
        schedule.createSchedule(key[i], value, function(err, rs){
        });
      }else{
        for(var j = 0 ; j<value.length;j++){
          schedule.createSchedule(key[i], value[j], function(err, rs){
          });
        }
      }
    }
    res.redirect("/QuanLy/LapLich");

  });
});

router.post("/createTimekeeping",function(req,res){
  timekeeping.deleteTimekeeping(true,function(err,rs){
    console.log(req.body);
    var key =   Object.keys(req.body);
    console.log("key: " + key);
    for(var i = 0; i< key.length ; i++){
      var value = req.body[key[i]];
      if((typeof value)=="string"){
        timekeeping.createTimekeeping(key[i], value, function(err, rs){
        });
      }else{
        for(var j = 0 ; j<value.length;j++){
          console.log("value[j] = ", value[j]);
          timekeeping.createTimekeeping(key[i], value[j], function(err, rs){
          });
        }
      }
    }
    res.redirect("/QuanLy/ChamCong");
  });
});

router.post("/addUser",function(req,res){
  user.insertUser(req.body,function(err,result){
    user.getUser(result.insertId,null,function(error,addedUser){
      res.send(addedUser);
    })
  });

});

router.get("/QuanLyDoUong", authen.isManager, function(req, res) {
  product.getProducts(null, null, function(err, results) { //Goi den ham getProducts (return results) cua Model Product

    user.getUser(req.user[0].iduser, null, function(err, user) {
      console.log(results);
      res.render("quanlydouong", {
        products: results,
        user: user
      });
    });

  });
});

router.post("/add", upload.single('productImage'), function(req, res) {
  console.log("ket qua gui len");
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    const host = req.host;
    console.log(req.body);
    var filePath = req.file.path.slice(7);
    console.log(filePath);
    // console.log(test.slice(7));
    product.insertProduct(filePath , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  }
});

router.post("/edit",upload.single('editProductImage') ,function(req, res) {
  console.log("edit nhan");
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    product.editProduct(null , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  } else {
    const host = req.host;
    console.log(req.body);
    var filePath = req.file.path.slice(7);
    console.log(filePath);
    product.editProduct(filePath , req.body,function(err , result){
      if(err) throw err;
      console.log("update product");
      res.redirect("/QuanLy/QuanLyDoUong");
    });
  }
});

router.post("/delete", function(req, res) {
  console.log("lolol" +req.body.ProductID);
  product.deleteProduct(req.body.ProductID, function(err, result) { //truyen vao mot dinh nghia ham
    // console.log(result);
  })
  res.send();
});


router.post("/LoadChart", function(req, res) {
  console.log(req.body);
  DonHang.getNumberProducts(req.body, null, function(err, results) {
    res.send(results);
  });
});

router.post("/editUser",function(req,res){
  console.log(req.body);
  user.editUser(req.body,function(err,rs){
    user.getUser(req.body.iduser,null,function(error,addedUser){
      res.send(addedUser);
    })
  })
});

module.exports = router;
