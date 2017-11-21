var express = require('express');
var products_sql = require("../model/Products.js");
var router = express.Router();
var multer  = require('multer');



// var products;
router.get("/", function (req, res) {
    products_sql.getProducts(null, null, function (err, results) { //Goi den ham getProducts (return results) cua Model Product
        res.render("W_QuanLyDoUong", { products: results }); //hien Thi W_QuanLyDoUong,
        // res.send(results);
        //goi den ham getProducts (return products) cua WFunction_QuanLyDoUong khi vua trang vua moi load
    });
});

// router.get("/get",function(req,res){
//     products_sql.getProducts(null,null,function(err,results){
//     res.render("WFunction_QuanLyDoUong", { products: results }); 
//     });
// });

router.post("/add", function(req, res){
    // console.log(req.body);
    products_sql.insertProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
    });
    res.render("hello");
});

router.post("/edit", function (req, res) {
    // console.log(req.body);
    products_sql.editProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
    });
    res.send();
});

router.post("/delete", function (req, res) {
    // console.log(req.body);
    products_sql.deleteProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
    });
    res.send();
});

var storage = multer.diskStorage({
  destination: function(rep,file,cb){
    cb(null, 'public/images/');
  },
  filename: function(rep,file,cb){
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

router.post("/upload", upload.single("myImage"), function(req,res){
  console.log(req.file);
  res.send("upload file thanh cong");
});

// router.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//       if (!req.file) {
//         console.log("No file received");
//       } else {
   
//         console.log("good");

//       }
//   });
// });


// router.post('/upload', function(req, res) {
//     router.use(multer({
//         dest: 'public/images/',
//         rename: function (fieldname, filename) {
//             return fieldname;
//         },
//         onFileUploadStart: function (file) {
//             console.log(file.originalname + ' is starting ...')
//         },
//         limits: {
//             files: 1
//         },
//         onFileUploadComplete: function (file) {
//             console.log(file.fieldname + ' uploaded to  ' + file.path)
//             imageUploaded=true;
//             console.log(req.files);
//             res.redirect('/');
//         }
//     }))

// });


// router.get('/add', function (req, res) {
//     console.log('===> params: ', req.params);
//     console.log('===> body: ', req.body);
// })
module.exports = router;