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

let router = express.Router();

let result={
    code:'200',
    text:'查询成功',
    data:{}
};

let username = '肥羊不绵';

router.route("/home/:username").get(function(req,res){
    console.log(req.params.username);
    res.render("post/home",{username:req.params.username});
});

router.get('/doindex',function (req,res) {
    Plate.selectPlate('add',function (err,rows) {
        result.data = rows;
        res.send(result);
    });
});

router.route("/plate/:id").get(function(req,res){
    console.log(req.params.tag);
    res.render("post/plate");

});

router.post('/doplate',function (req,res) {
    console.log(req.body);
    let plateid = req.body.plateid;
    console.log(plateid);
    Plate.selectPlatebyPlateid(plateid,function (err,rows) {
        result.data = rows;
        res.send(result);
    });
});




module.exports = router;
