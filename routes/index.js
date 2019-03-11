const express = require('express');
let router = express.Router();

router.route("/").get(function(req,res){
    res.render("index");
});
router.route("/index").get(function(req,res){
    res.render("index");
});


module.exports = router;
