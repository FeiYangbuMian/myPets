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

router.route("/").get(function(req,res){
    res.render("post/home");
});
router.route("/home").get(function(req,res){
    res.render("post/home");
});

module.exports = router;
