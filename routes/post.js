/**
 * 关于帖子
 * /add
 * /delete
 * /select
 * /upload
 *
 */

const express = require('express');
let router = express.Router();

let username = '肥羊不绵';

router.route("/").get(function(req,res){
    res.render("post/home",{username:username});
}).post(function(req,res){
    res.render("post/home",{username:username});
});

router.route("/home").get(function(req,res){
    res.render("post/home",{username:username});
});



module.exports = router;
