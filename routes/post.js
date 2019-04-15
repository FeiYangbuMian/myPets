/**
 * 关于帖子
 * /add
 * /delete
 * /select
 * /upload
 *
 */

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
    res.render("post/home",{username:req.params.username});
});

router.get('/doindex',function (req,res) {
    Plate.selectPlate(function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.data = rows;
        }
        return res.send(result);
    });
});

router.route("/plate/:id").get(function(req,res){
    console.log(req.params.id);
    res.render("post/plate");
});

router.post('/doplate',function (req,res) {
    console.log(req.body);
    result.user = req.session.user;
    let plateId = req.body.plateId;
    console.log(plateId);
    Plate.selectPlatebyId(plateId,function (err,rows) {
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
            result.info = rows[0];
        }
    });
    Post.selectPostbyPlateid([plateId],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        result.list = rows;
        res.send(result);
    });
});

router.post('/uppost',function (req,res) {
    let data = req.body;
    data.postStart = Util.currentTime();
    Post.insertPost([data.postTitle,data.postContent,data.postPhoto,data.postStart,data.postLimit,data.userName,data.plateId],function (err,rows) {
        console.log(rows);
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误,上传失败！';
        } else {
            result.text = '发表成功！';
            res.send(result);
        }
    });
});

router.route("/plate/:id/:postId").get(function(req,res){
    console.log(req.params);
    console.log(req.params.postId);
    res.render("post/post");
});

router.post('/plate/:id/:postId',function (req,res) {
    console.log(req.params.postId);
    result.user = req.session.user;
   Reply.selectReplybyPostid([postId],function (err,rows) {
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
            result.list = rows;
            res.send(result);
        }
    });
});

module.exports = router;
