var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.route("/login").get(function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("login",{title:'User Login'});
}).post(function(req,res){                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    let name = req.body.name;                //获取post上来的 data数据中 uname的值
    let pwd = req.body.pwd;
    req.session.user = {"name":name,"pwd":pwd};
        res.send(200);
});

module.exports = router;
