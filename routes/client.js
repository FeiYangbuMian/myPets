const express = require('express');
let router = express.Router();

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

let username = '肥羊不绵';

router.post('/upload-photo',function (req,res) {
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
   /* form.uploadDir = '../myPets/public/image/userPhoto/';
    form.keepExtensions = true;
    form.maxFieldsSize = 2*1024*1024;*/

    form.parse(req,function (err,fields,files) {
        /*console.log(files);//文件
        console.log(fields);//非文件*/
        let usersex = fields.usersex,
            userbrith = fields.userbrith,
            useraddress = fields.useraddress,
            userphoto = files.userphoto.name; //input的name
        username = fields.username;

        if (!userphoto) {
            console.log('不存在');
            userphoto = 'user_default.jpg';
            res.render('server/home',{username:username});
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
            res.render('server/home',{username:username});
        });
    });
});




/* GET home page. */
/*router.route('/index').get(function(req, res) {
    //res.render('index', { title: 'Express' });
    // res.render(view,[locals],callback)：
    // 渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。
    // callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
     res.render('index');
});*/

/* GET login page. */
/*router.route("/login").get(function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    //res.render("client/login",{title:'User Login'});
    res.render("client/login");
}).post(function(req,res){                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    /!* let name = req.body.name;                //获取post上来的 data数据中 uname的值
     let pwd = req.body.pwd;
     req.session.user = {"name":name,"pwd":pwd};
     res.send(200);*!/

});*/

router.route("/").get(function(req,res){
    res.render("index");
});
router.route("/index").get(function(req,res){
    res.render("index");
});
router.route("/login").get(function(req,res){
    res.render("client/login");
});

/*router.route("/dologin").post(function (req,res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req,function (err,fields,files) {
        console.log(fields);
        let userpwd = fields.userpwd;
        username = fields.username;

        res.render('server/home',{username:username});
    });
});*/


router.route("/register").get(function(req,res){
    res.render("client/register");
});

router.route("/register1").get(function(req,res){
    res.render("client/register1");
});
router.route("/register2").get(function(req,res){
    res.render("client/register2");
});
router.route("/register3").get(function(req,res){
    res.render("client/register3");
});

router.route("/getpassword").get(function(req,res){
    res.render("client/getpassword");
});

router.route("/useragreement").get(function(req,res){
    res.render("client/useragreement");
});

router.route("/home").get(function(req,res){
    res.render("server/home",{username:username});
});

module.exports = router;
