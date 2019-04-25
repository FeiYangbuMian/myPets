const express = require('express');
const Plate = require('../models/Plate');
const Post = require('../models/Post');
const Reply = require('../models/Reply');
const Util = require('../middleware/util');

let router = express.Router();

let result={
    code: 1,
    text:'成功',
    user:{}
};


router.route("/home/:username").get(function(req,res){
    console.log(req.params.username);
    res.render("admin/home",{username:req.params.username});
});
