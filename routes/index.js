const express = require('express');
const Plate = require('../models/Plate');

let router = express.Router();

let result={
    code:'200',
    text:'查询成功',
    data:{}
};

router.route("/").get(function(req,res){
    return res.render("index");
});
router.route("/index").get(function(req,res){
    return res.render("index");
});

router.get('/doindex',function (req,res) {
    Plate.selectPlate(function (err,rows) {
        result.data = rows;
        return res.send(result);
    });
});

router.route("/login").get(function(req,res){
    return res.render("client/login");
});

router.route("/register").get(function(req,res){
    return res.render("client/register");
});

router.route("/post").get(function(req,res){
    return res.render("post/home");
});

router.route("/admin").get(function(req,res){
    return res.render("admin/home");
});

module.exports = router;
