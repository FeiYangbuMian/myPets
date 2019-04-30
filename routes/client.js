const express = require('express');

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const nodemailer  = require('nodemailer');
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
    return res.render("client/login");
});

router.route("/login").get(function(req,res){
    return res.render("client/login");
});

router.route("/logout").get(function(req,res){

    return res.render("client/login");
});

router.post('/dologin',function (req,res) {
    console.log(req.body);
    let userPwd = req.body.userPwd;
    userName = req.body.userName;
    //req.session.userName = userName;

    User.selectUserbyName(userName,function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '暂无此人';
            return res.send(result);
        }
        User.selectUser([userName,userPwd],function (err,rows) {
            if (rows.length === 0) {
                result.code = 0;
                result.text = '密码错误';
                return res.send(result);
            }
            result.code = 1;
            result.text = '';
            req.session.user = rows[0];
            result.userName = userName;
            result.user = rows[0];
            return res.send(result);
        });
    });
});

router.route("/getpassword").get(function(req,res){
    return res.render("client/getpassword");
});

router.post('/dopassword',function (req,res) {
    console.log(req.body);
    let userPwd = req.body.userPwd,
        userEmail = req.body.userEmail;
    User.updateUserpwd([userPwd,userEmail],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '修改失败';
            return res.send(result);
        }
        console.log(rows);
        result.code = 1;
        result.text = '';
        result.userEmail = userEmail;
        return res.send(result);
    });
});

router.route("/register").get(function(req,res){
    return res.render("client/register");
});

router.post('/doregister',function (req,res) {
    console.log(req.body);
    let current = Util.currentTime(),
        userPwd = req.body.userPwd,
        userEmail = req.body.userEmail;
    User.insertUser([userEmail,current,userPwd,userEmail],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '注册失败';
            return res.send(result);
        }
        console.log(rows);
        result.code = 1;
        result.text = '';
        result.userEmail = userEmail;
        return res.send(result);
    })
});

router.route("/useragreement").get(function(req,res){
    return res.render("client/useragreement");
});

router.route("/register1").get(function(req,res){
    console.log(req.query);
    console.log(req.query.useremail);
    if (!req.query || !req.query.useremail) {
        return res.render("client/login");
    }
    return res.render("client/register1");
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
                        return res.render('error');
                    }
                    if (rows.length === 0) {
                        result.code = 0;
                        result.text = '头像上传失败';
                        return res.send(result);
                        return;
                    }
                    result.code = 1;
                    result.text = '';
                    result.data = newfilename;
                    return res.end(newfilename);
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
            return res.render('error');
        }
        if (rows.length !== 0) {
            result.code = 0;
            result.text = '用户名已存在';
            return res.send(result);
        }
        result.code = 1;
        result.text = ''
        return res.send(result);
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
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '信息完善失败';
            return res.send(result);
        }
        result.code = 1;
        result.text = '';
        return res.send(result);
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
            return res.send(result);
        }
        mail.sendMail(options,function (err,msg) {
            if (err){
                console.log(err);
                res.end();
            } else {
                result.code = 1;
                result.text = '';
                result.data = code;
                return res.send(result);
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
            return res.send(result);
        }
        mail.sendMail(options,function (err,msg) {
            if (err){
                console.log(err);
                res.end();
            } else {
                result.code = 1;
                result.text = '';
                result.data = code;
                return res.send(result);
            }
        });
    });
});




router.route("/userinfo").get(function(req,res){
    let user = req.session.user;
    if (!user) return res.render("client/login");
    return res.render("client/userinfo");
});


router.post('/myinfo',function (req,res) {
    let userName = req.session.user.userName;
    User.selectUserbyName(userName, function (err, rows) {
        if (err) {
            return res.render('error');
        }
        result.code = 1;
        result.text = '我的信息查询成功';
        result.user = rows[0];
        return res.send(result);
    });
});
router.post('/mypost',function (req,res) {
    let userName = req.session.user.userName;
    Post.selectPostbyUsername([userName],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.code = 1;
        result.text = '我的帖子查询成功';
        result.list = rows;
        result.length = rows.length;
        return res.send(result);
    });
});
router.post('/myreply',function (req,res) {
    let userName = req.session.user.userName;
    Reply.selectMyreply([userName],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.code = 1;
        result.text = '我的回复查询成功';
        result.list = rows;
        result.length = rows.length;
        return res.send(result);
    });
});

router.post('/replyme',function (req,res) {
    let userName = req.session.user.userName;
    Reply.selectIsread([userName],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.code = 1;
        result.text = '未读回复查询成功';
        result.list = rows;
        result.length = rows.length;
        return res.send(result);
    });
});


router.post('/domodify',function (req,res) {
    let data = req.body;
    console.log(data);
    User.updateUserExtra([data.userBirth,data.userArea,data.userQQ,data.userWechat,data.userName],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '修改失败';
            return res.send(result);
        }
        result.code = 1;
        result.text = '';
        return res.send(result);
    })
});


module.exports = router;
