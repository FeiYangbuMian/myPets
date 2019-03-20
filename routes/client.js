const express = require('express');

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const nodemailer  = require('nodemailer');
const config = require('../middleware/config');
const mail = require('../middleware/mail');
const Util = require('../middleware/util');
const db = require('../middleware/db');

let router = express.Router();

let username = '肥羊不绵';

let result={};

let form = new formidable.IncomingForm();
form.encoding = 'utf-8';

router.route("/").get(function(req,res){
    res.render("client/login");
});

router.route("/login").get(function(req,res){
    res.render("client/login");
});

router.post('/dologin',function (req,res) {
    console.log(req.body);
    let userpwd = req.body.userpwd;
    username = req.body.username;
    let selectUsername = `SELECT * FROM t_user WHERE userName='${username}'`;
    let selectUser = `SELECT * FROM t_user WHERE userName='${username}' AND userPwd='${userpwd}'`;

    db.query(selectUsername, function (err, rows, fields) {
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
        db.query(selectUser, function (err, rows, fields) {
            if (rows.length === 0) {
                result.code = 0;
                result.text = '密码错误';
                res.send(result);
                return;
            }
            result.code = 1;
            result.text = '';
            result.username = username;
            res.send(result);
            //res.render("post/home",{username:username});
        });
    });

});


router.route("/register").get(function(req,res){
    res.render("client/register");
});

router.route("/register1").get(function(req,res){
    res.render("client/register1");
});

router.post('/dophoto',function (req,res) {

    form.parse(req,function (err,fields,files) {
        let usersex = fields.usersex,
            userbrith = fields.userbrith,
            useraddress = fields.useraddress,
            userphoto = files.userphoto.name; //input的name
        username = fields.username;

        if (!userphoto) {
            console.log('不存在');
            userphoto = 'user_default.jpg';
            res.render('post/home',{username:username});
            return false;
        }
        let t = (new Date()).getTime();
        let ran = parseInt(Math.random() * 8999 + 10000);
        let extname = path.extname(userphoto);

        let oldpath = path.normalize(files.userphoto.path);

        let newfilename = t + ran + extname;
        let newpath = '../myPets/public/image/userPhoto/' + newfilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.log('改名失败' + err);
            }
            res.render('post/home',{username:username});
        });
    });
});

router.route("/getpassword").get(function(req,res){
    res.render("client/getpassword");
});

router.route("/useragreement").get(function(req,res){
    res.render("client/useragreement");
});


/*router.route('/home').get(function (req,res) {
    res.render('')
})*/



router.get('/docode',function (req,res,next) {
    console.log(req.query); //多适用于get请求
    console.log(req.query.useremail);
    let tomail = req.query.useremail,
        code= Util.math.random(100000,1000000);

    let options = {
        from:'"萌宠战记"<1136260155@qq.com>',
        to:tomail,
        subject:'通知：验证码',
        html:`<h1>这是一封用于测试的邮件！<br /><p>您的验证码是${code}</p></h1>`
    };
    mail.sendMail(options,function (err,msg) {
        if (err){
            console.log(err);
            res.end();
        } else {
            console.log({code:code});
            res.end();
        }
    });
})

























module.exports = router;
