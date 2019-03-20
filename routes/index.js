const express = require('express');
let router = express.Router();

router.route("/").get(function(req,res){
    res.render("index");
});

router.route("/index").get(function(req,res){
    res.render("index");
});

router.route("/login").get(function(req,res){
    res.render("client/login");
});

router.route("/register").get(function(req,res){
    res.render("client/register");
});

router.route("/post").get(function(req,res){
    res.render("post/home");
});

module.exports = router;
