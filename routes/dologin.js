const express = require('express');
let router = express.Router();

const formidable = require('formidable');

let username = '肥羊不绵';


router.route("/dologin").post(function (req,res) {

    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req,function (err,fields,files) {
        console.log(fields);
        let userpwd = fields.userpwd;
        username = fields.username;

        res.render('server/home',{username:username});
    });
});

router.route("/home").get(function(req,res){
    res.render("server/home",{username:username});
});

module.exports = router;
