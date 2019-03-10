const express = require('express');
let router = express.Router();

//let username = '肥羊不绵';

router.route("/").get(function(req,res){
    res.render("index");
});
router.route("/index").get(function(req,res){
    res.render("index");
});
router.route("/login").get(function(req,res){
    res.render("client/login");
});
