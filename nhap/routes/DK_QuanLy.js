var express = require('express');
var products_sql = require("../model/Products.js");
var router = express.Router();
var multer  = require('multer');
var upload = multer();
var app = express();

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

app.post('/profile', upload.array(), function (req, res, next) {
  
});
// router.get('/add', function (req, res) {
//     console.log('===> params: ', req.params);
//     console.log('===> body: ', req.body);
// })
module.exports = router;