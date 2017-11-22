var express = require('express');
var products_sql = require("../model/Products.js");
var router = express.Router();

// var products;
router.get("/", function (req, res) {
    // console.log(req)
    // getProductArray cua DK_QuanLy
    products_sql.getProducts(null, null, function (err, results) { //Goi den ham getProducts (return results) cua Model Product
        // console.log(results);
        // products = JSON.parse(results);
        res.render("W_QuanLyDoUong", { products: results }); //hien Thi W_QuanLyDoUong,
        // res.send(results);
        //goi den ham getProducts (return products) cua WFunction_QuanLyDoUong khi vua trang vua moi load
    });
});
router.post("/add", function(req, res){
    console.log(req.body);
    products_sql.insertProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        products_sql.getProduct(result, null, (rs)=>{
            console.log("ket qua query" + result);
            console.log(rs[0]);
            res.send(rs[0]);
        })

    })

})
router.post("/edit", function (req, res) {
    console.log(req.body);
    products_sql.editProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        console.log(result);
    })
    res.send()
})
router.post("/delete", function (req, res) {
    // console.log(req.body);
    products_sql.deleteProduct(req.body, (result) => { //truyen vao mot dinh nghia ham
        // console.log(result);
    })
    res.send()
})

// router.get('/add', function (req, res) {
//     console.log('===> params: ', req.params);
//     console.log('===> body: ', req.body);
// })
module.exports = router;
