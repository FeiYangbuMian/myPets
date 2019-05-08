const express = require('express');
const Plate = require('../models/Plate');
const Post = require('../models/Post');
const Reply = require('../models/Reply');
const Util = require('../middleware/util');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let router = express.Router();

let result={
    code: 1,
    text:'成功',
    user:{}
};

router.route("/home/:username").get(function(req,res){
    let user = req.session.user;
    if (!user) return res.render("client/login");
    console.log(req.params.username);
    return res.render("post/home",{username:req.params.username});
});

router.get('/doindex',function (req,res) {
    let user = req.session.user;
    if (!user) return res.render("client/login");
    Plate.selectPlate(function (err,rows) {
        if (err) {
            return res.render('error');
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
    let user = req.session.user;
    if (!user) return res.render("client/login");
    console.log(req.params.id);
    return res.render("post/plate");
});

router.post('/doplate',function (req,res) {
    console.log(req.body);
    result.user = req.session.user;
    let plateId = req.body.plateId;
    console.log(plateId);
    Plate.selectPlatebyId(plateId,function (err,rows) {
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

router.post('/dosort1',function (req,res) {
    console.log(req.body);
    result.user = req.session.user;
    let plateId = req.body.plateId;
    console.log(plateId);
    Post.selectPostbyPlateid([plateId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.list = rows;
        return res.send(result);
    });
});
router.post('/dosort2',function (req,res) {
    console.log(req.body);
    result.user = req.session.user;
    let plateId = req.body.plateId;
    console.log(plateId);
    Post.sortPostbyReply([plateId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.list = rows;
        return res.send(result);
    });
});

router.post('/dosearch',function (req,res) {
    let plateId = req.body.plateId,
        postTitle = '%'+req.body.postTitle+'%';
    Post.selectPostbyTitle([postTitle,plateId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.list = rows;
        return res.send(result);
    });
});

router.post('/uppost',function (req,res) {
    let all=[]; //存放图片文件
    let data = {}; //存放数据
    let postPhotos = ''; //存放照片名称
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;//是否包含文件后缀
    form.multiples=true; //设置为多文件上传
    form.uploadDir = "../myPets/public/image/postPhoto"; //缓存地址
    form.on('file',function (filed,file) {
        all.push([filed,file]);
    }).
    parse(req,function (err,fields,files) {
        if(err){
            throw err;
        }
        console.log(fields);
        data = fields;

        for (let i=0,len=all.length;i<len;i++) {
            let postPhoto = all[i][1].name;
            let t = (new Date()).getTime();
            let ran = parseInt(Math.random() * 8999 + 10000);
            let extname = path.extname(postPhoto);
            let oldpath = path.normalize(all[i][1].path);
            let newfilename = t + ran + extname;
            let newpath = '../myPets/public/image/postPhoto/' + newfilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log('改名失败' + err);
                    return false;
                } else {
                    console.log('改名成功');
                    console.log(postPhotos);
                }
            });
            postPhotos += newfilename + ',';
        }
    }).
    on('end',function () {
        let postStart = Util.currentTime();
        Post.insertPost([data.postTitle,data.postContent,postPhotos,postStart,0,data.userName,data.plateId],function (err,rows) {
            if (err) {
                return res.render('error');
            }
            if (rows.length === 0) {
                result.code = 0;
                result.text = '未知错误,上传失败！';
            } else {
                result.text = '发表成功！';
                return res.end('1111');
            }
        });
    });
});

router.route("/plate/:id/:postId").get(function(req,res){
    let user = req.session.user;
    if (!user) return res.render("client/login");
    console.log(req.params);//req.params.id, req.params.postId
    return res.render("post/post");
});

router.post('/docount',function (req,res) {
    result.user = req.session.user;
    Reply.selectIsread([result.user.userName],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.count = rows.length;
        return res.send(result);
    });
});

router.post('/dopost',function (req,res) {
    result.user = req.session.user;
    let postId = req.body.postId;
    Post.selectPostbyId([postId],function (err,rows) {
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
        }
    });
   Reply.selectReplybyPostid([postId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
       result.code = 1;
       result.text = '查询成功';
       result.list = rows;
       //return res.send(result);
    });
    Reply.selectReplyLOL([postId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.code = 1;
        result.text = '查询成功';
        result.lol = rows;
        return res.send(result);
    });
});

router.post('/upreply',function (req,res) {
    let all=[]; //存放图片文件
    let data = {}; //存放数据
    let replyPhotos = ''; //存放照片名称
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;//是否包含文件后缀
    form.multiples = true; //设置为多文件上传
    form.uploadDir = "../myPets/public/image/replyPhoto"; //缓存地址
    form.on('file',function (filed,file) {
        all.push([filed,file]);
    }).
    parse(req,function (err,fields,files) {
        if (err) {
            throw err;
        }
        console.log(fields);
        data = fields;
        for (let i = 0, len = all.length; i < len; i++) {
            let replyPhoto = all[i][1].name;
            console.log('replyPhoto:'+replyPhoto);
            let t = (new Date()).getTime();
            let ran = parseInt(Math.random() * 8999 + 10000);
            let extname = path.extname(replyPhoto);
            let oldpath = path.normalize(all[i][1].path);
            let newfilename = t + ran + extname;
            let newpath = '../myPets/public/image/replyPhoto/' + newfilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log('改名失败' + err);
                    console.log(oldpath);
                    console.log(newpath);
                    return true;
                } else {
                    console.log('改名成功');
                    console.log(replyPhotos);
                }
            });
            replyPhotos += newfilename + ',';
        }
    }).
    on('end',function () {
        let replyTime = Util.currentTime();
        console.log(replyPhotos);
        Reply.insertReply([data.replyContent, replyPhotos, replyTime, data.replyFloor, data.replyState, data.postId, data.userNameF, data.userNameT], function (err, rows) {
            if (err) {
                return res.render('error');
            }
            if (rows.length === 0) {
                result.code = 0;
                result.text = '未知错误,上传失败！';
            } else {
                result.text = '发表成功！';
            }
        });
        Post.updatePostreply([data.postReply, data.postId], function (err, rows) {
            if (err) {
                return res.render('error');
            }
            if (rows.length === 0) {
                result.code = 0;
                result.text = '回复数增加失败！';
            } else {
                return res.end('2222');
            }
        });
    });
});

router.post('/uplol',function (req,res) {
    let data = req.body;
    let replyTime = Util.currentTime();
    console.log(replyTime);
    Reply.insertReply([data.replyContent,data.replyPhoto,replyTime,data.replyFloor,data.replyState,data.postId,data.userNameF,data.userNameT],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '未知错误,上传失败！';
        } else {
            result.text = '发表成功！';
        }
    });
    Post.updatePostreply([data.postReply,data.postId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        if (rows.length === 0) {
            result.code = 0;
            result.text = '回复数增加失败！';
        } else {
            return res.send(result);
        }
    });
});


router.post('/doread',function (req,res) {
    let replyId = req.body.replyId;
    Reply.updateIsread([replyId],function (err,rows) {
        if (err) {
            return res.render('error');
        }
        result.code=1;
        result.text = '已读！';
        return res.send(result);
    });
});

module.exports = router;
