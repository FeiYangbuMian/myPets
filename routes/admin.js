const express = require('express');
const User = require('../models/User');
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
    let user = req.session.user;
    if (!user) res.render("client/login");
    console.log(req.params.username);
    res.render("admin/home",{username:req.params.username});
});

router.post('/users',function (req,res,next) {
    User.selectUsers(function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.users = rows;
            res.send(result);
        }
    });
});

router.post('/plates',function (req,res,next) {
    Plate.selectPlate(function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.plates = rows;
            res.send(result);
        }
    });
});

router.post('/posts',function (req,res,next) {
    Post.selectPosts(function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.posts = rows;
            res.send(result);
        }
    });
});

router.post('/replys',function (req,res,next) {
    Reply.selectReplys(function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.replys = rows;
            res.send(result);
        }
    });
});

module.exports = router;
