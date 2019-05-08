const express = require('express');
const User = require('../models/User');
const Plate = require('../models/Plate');
const Post = require('../models/Post');
const Reply = require('../models/Reply');
const Back = require('../models/Back');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

let router = express.Router();

let form = new formidable.IncomingForm();
form.encoding = 'utf-8';
form.uploadDir = "../myPets/public/image";

let result={
    code: 1,
    text:'成功',
    user:{}
};


router.route("/home/:username").get(function(req,res){
    let user = req.session.user;
    if (!user) return res.render("client/login");
    console.log(req.params.username);
    return res.render("admin/home",{username:req.params.username});
});

router.post('/users',function (req,res,next) {
    result.user = req.session.user;
    User.selectUsers(function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.users = rows;
            return res.send(result);
        }
    });
});

router.post('/plates',function (req,res,next) {
    Plate.selectPlate(function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.plates = rows;
            return res.send(result);
        }
    });
});

router.post('/posts',function (req,res,next) {
    Post.selectPosts(function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.posts = rows;
            return res.send(result);
        }
    });
});

router.post('/replys',function (req,res,next) {
    Reply.selectReplys(function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.replys = rows;
            return res.send(result);
        }
    });
});

router.post('/backs',function (req,res,next) {
    Back.selectBack(function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.backs = rows;
            return res.send(result);
        }
    });
});

router.route("/plateinfo").get(function(req,res){
    let user = req.session.user;
    if (!user) return res.render("client/login");
    console.log(req.query.id);
    let id = req.query.id;
    if (id) {
        return res.render("admin/plateinfo");
    } else {
        return res.render("error");
    }
});

router.post('/plateinfo',function (req,res,next) {
    let plateId = req.body.plateId;
    console.log(req.body.plateId);
    Plate.selectPlatebyId([plateId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误';
        } else {
            result.code = 1;
            result.text = '查询成功';
            result.info = rows[0];
            return res.send(result);
        }
    });
});


router.post('/domodify',function (req,res) {
    let data = req.body;
    console.log(data);
    Plate.updatePlate([data.plateName,data.plateIntro,data.plateId],function (err,rows) {
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

router.post('/dophoto',function (req,res,next) {
    form.parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }
        console.log(fields);
        let platePhoto = files.platePhoto.name; //input的name
        let plateId = fields.plateId;
        console.log(platePhoto);

        let t = (new Date()).getTime();
        let extname = path.extname(platePhoto);
        let oldpath = path.normalize(files.platePhoto.path);
        let newfilename = 'img_' + t + extname;
        let newpath = '../myPets/public/image/' + newfilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                result.code = 0;
                result.text = '未知错误，上传失败！';
                console.log('改名失败' + err);
                return;
            } else {
                Plate.updatePlatephoto([newfilename,plateId],function (err,rows) {
                    if (err) {
                        return res.render('error');
                    }
                    if (rows.length === 0) {
                        result.code = 0;
                        result.text = '头像上传失败';
                        return res.send(result);
                    }
                    result.code = 1;
                    result.text = '';
                    result.data = newfilename;
                    return res.send(newfilename);
                });
            }
        });
    });
});


module.exports = router;
