const express = require('express');

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const nodemailer  = require('nodemailer');
const config = require('../middleware/config');
const mail = require('../middleware/mail');
const Util = require('../middleware/util');
const User = require('../models/User');
const Post = require('../models/Post');
const Reply = require('../models/Reply');

let router = express.Router();

let userName = '肥羊不绵';

let result={
    code: 1,
    text:'成功',
    user:{}
};

let form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.uploadDir = "../myPets/public/image/userPhoto";


router.route("/").get(function(req,res){
    res.render("client/login");
});

router.route("/login").get(function(req,res){
    res.render("client/login");
});

router.post('/dologin',function (req,res) {
    console.log(req.body);
    let userPwd = req.body.userPwd;
    userName = req.body.userName;
    //req.session.userName = userName;

    User.selectUserbyName(userName,function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '暂无此人';
            res.send(result);
            return;
        }
        req.session.user = rows[0];
        User.selectUser([userName,userPwd],function (err,rows) {
            if (rows.length === 0) {
                result.code = 0;
                result.text = '密码错误';
                res.send(result);
                return;
            }
            result.code = 1;
            result.text = '';
            result.userName = userName;
            res.send(result);
        });
    });
});

router.route("/getpassword").get(function(req,res){
    res.render("client/getpassword");
});

router.post('/dopassword',function (req,res) {
    console.log(req.body);
    let userPwd = req.body.userPwd,
        userEmail = req.body.userEmail;
    User.updateUserpwd([userPwd,userEmail],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '修改失败';
            res.send(result);
            return;
        }
        console.log(rows);
        result.code = 1;
        result.text = '';
        result.userEmail = userEmail;
        res.send(result);
    });
});

router.route("/register").get(function(req,res){
    res.render("client/register");
});

router.post('/doregister',function (req,res) {
    console.log(req.body);
    let current = Util.currentTime(),
        userPwd = req.body.userPwd,
        userEmail = req.body.userEmail;
    User.insertUser([userEmail,current,userPwd,userEmail],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '注册失败';
            res.send(result);
            return;
        }
        console.log(rows);
        result.code = 1;
        result.text = '';
        result.userEmail = userEmail;
        res.send(result);
    })
});

router.route("/useragreement").get(function(req,res){
    res.render("client/useragreement");
});

router.route("/register1").get(function(req,res){
    res.render("client/register1");
});

router.post('/dophoto',function (req,res,next) {
    form.parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }
        console.log(fields);
        let userPhoto = files.userPhoto.name; //input的name
        let userEmail = fields.userEmail;
        console.log(userPhoto);

        let t = (new Date()).getTime();
        let ran = parseInt(Math.random() * 8999 + 10000);
        let extname = path.extname(userPhoto);
        let oldpath = path.normalize(files.userPhoto.path);
        let newfilename = t + ran + extname;
        let newpath = '../myPets/public/image/userPhoto/' + newfilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                result.code = 0;
                result.text = '未知错误，上传失败！';
                console.log('改名失败' + err);
                return;
            } else {
                User.updateUserphoto([newfilename,userEmail],function (err,rows) {
                    if (err) {
                        res.render('error');
                        return;
                    }
                    if (rows.length === 0) {
                        result.code = 0;
                        result.text = '头像上传失败';
                        res.send(result);
                        return;
                    }
                    console.log(rows);
                    result.code = 1;
                    result.text = ''
                    result.data = newfilename;
                    res.send(result);
                });
            }
        });
    });
});

router.post('/ifname',function (req,res) {
    console.log(req.body);
    let userName = req.body.userName;
    User.selectUserbyName(userName,function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length !== 0) {
            result.code = 0;
            result.text = '用户名已存在';
            res.send(result);
            return;
        }
        result.code = 1;
        result.text = ''
        res.send(result);
    });
});

router.post('/doregister1',function (req,res) {
    console.log(req.body);
    let userName = req.body.userName,
        userBrith = req.body.userBrith,
        userArea = req.body.userArea,
        userEmail = req.body.userEmail;
    User.updateUser([userName,userBrith,userArea,userEmail],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '信息完善失败';
            res.send(result);
            return;
        }
        result.code = 1;
        result.text = '';
        res.send(result);
    });
});

router.get('/docode',function (req,res,next) {
    console.log(req.query.userEmail);
    let tomail = req.query.userEmail,
        code= Util.math.random(100000,1000000);
    let options = {
        from:'"萌宠战记"<1136260155@qq.com>',
        to:tomail,
        subject:'通知：验证码',
        html:`<p>萌宠战记提醒您：</p><br />
              <p>您的验证码是<span style="color: #0d6aad">${code}</span></p>`
    };

    User.selectUserbyEmail([tomail],function (err,rows) {
        if (rows.length !== 0) {
            result.code = 0;
            result.text = '邮箱已存在';
            res.send(result);
            return;
        }
        mail.sendMail(options,function (err,msg) {
            if (err){
                console.log(err);
                res.end();
            } else {
                result.code = 1;
                result.text = '';
                result.data = code;
                res.send(result);
                res.end();
            }
        });
    });
});

router.get('/docode2',function (req,res,next) {
    console.log(req.query.userEmail);
    let tomail = req.query.userEmail,
        code= Util.math.random(100000,1000000);
    let options = {
        from:'"萌宠战记"<1136260155@qq.com>',
        to:tomail,
        subject:'通知：验证码',
        html:`<p>萌宠战记提醒您：</p>
              <p>您的验证码是<span style="color: #0d6aad">${code}</span></p>`
    };

    User.selectUserbyEmail([tomail],function (err,rows) {
        if (rows.length === 0) {
            result.code = 0;
            result.text = '邮箱不存在';
            res.send(result);
            return;
        }
        mail.sendMail(options,function (err,msg) {
            if (err){
                console.log(err);
                res.end();
            } else {
                result.code = 1;
                result.text = '';
                result.data = code;
                res.send(result);
                res.end();
            }
        });
    });
});




router.route("/userinfo").get(function(req,res){
    res.render("client/userinfo");
});


router.post('/userinfo',function (req,res) {
    let userName = req.session.user.userName;
    console.log('userName:'+userName);
    User.selectUserbyName(userName,function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        result.user = rows[0];
    });
    Post.selectPostbyUsername([userName],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        result.mypostcode = 1;
        result.text = '查询帖子成功';
        result.mypost = rows;
        result.mypostlen = rows.length;
    });
    Reply.selectMyreply([userName],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        result.myreplycode = 1;
        result.text = '查询帖子成功';
        result.myreply = rows;
        result.myreplylen = rows.length;
    });
    Reply.selectIsread([userName],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        result.replymecode = 1;
        result.text = '查询帖子成功';
        result.replyme = rows;
        result.replymelen = rows.length;
        res.send(result);
    });
});

router.post('/domodify',function (req,res) {
    console.log(req.body);
    let data = req.body;
    console.log(data);
    User.updateUserExtra([data.userBrith,data.userArea,data.userQQ,data.userWechat,data.userName],function (err,rows) {
        if (err) {
            res.render('error');
            return;
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '修改失败';
            res.send(result);
            return;
        }
        result.code = 1;
        result.text = '';
        res.send(result);
    })
});













module.exports = router;
