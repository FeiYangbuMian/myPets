/*
 * 作者：FeiYang
 * 创建时间：2019-04-12
 * 版本：[1.0,2019-04-12]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function Post(post){
    this.postId = post.postId;
    this.postTitle = post.postTitle;
    this.postContent = post.postContent;
    this.postPhoto = post.postPhoto;
    this.postStart = post.postStart;
    this.postLimit = post.postLimit;
    this.postReply = post.postReply;
    this.postLike = post.postLike;
    this.postStatus = post.postStatus;
    this.userName = post.userName;
    this.plateId = post.plateId;
}

/**
 * 根据板块ID查询帖子信息
 * @param arr
 * @param callback
 */

Post.selectPostbyPlateid = function (arr,callback){
    let selectSql = `SELECT * FROM t_post where plateId = ? order by postId DESC`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectPostbyPlateid err:' + err);
            return;
        }
        console.log('selectPostbyPlateid success.');
        callback(err,rows);
    });
};

/**
 * 发帖
 * @param arr [标题，内容，图片，发帖时间，权限，发帖人，板块ID]
 * @param callback
 */
Post.insertPost = function (arr,callback){
    let insertSql = `insert into t_post (postTitle,postContent,postPhoto,postStart,postLimit,userName,plateId) values (?,?,?,?,?,?,?)`;
    db.query(insertSql,arr,function (err,rows,fields) {
        console.log(arr);
        if (err){
            console.log('insertPost err:' + err);
            return;
        }
        console.log('insertPost success.');
        callback(err,rows);
    });
};

/**
 * 根据帖子ID查询帖子
 * @param arr [帖子id]
 * @param callback
 */
Post.selectPostbyId = function (arr,callback){
    let selectSql = 'SELECT p.postId,p.postTitle,p.postContent,p.postPhoto,p.postStart,p.postLimit,p.postReply,p.postLike,p.userName,p.plateId,u.userPhoto FROM t_post as p,t_user as u where p.postId = ? and p.userName = u.userName';
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectPostbyId err:' + err);
            return;
        }
        console.log('selectPostbyId success.');
        callback(err,rows);
    });
};

/**
 * 根据用户名查询帖子 ——> 我的发帖
 * @param arr [用户名]
 * @param callback
 */
Post.selectPostbyUsername = function (arr,callback){
    let selectSql = 'SELECT pl.plateId,pl.plateName,po.postId,po.postTitle,po.postStart,po.postReply FROM t_post AS po,t_plate AS pl where po.userName = ? and po.plateId = pl.plateId order by po.postId DESC';
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectPostbyUsername err:' + err);
            return;
        }
        console.log('selectPostbyUsername success.');
        callback(err,rows);
    });
};
/**
 * 根据回复数降序查询
 * @param arr
 * @param callback
 */
Post.sortPostbyReply = function(arr,callback){
    let selectSql = `SELECT * FROM t_post where plateId = ? order by postReply DESC`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('sortPostbyReply err:' + err);
            return;
        }
        console.log('sortPostbyReply success.');
        callback(err,rows);
    });
};
/**
 * 回复数增加
 * @param arr
 * @param callback
 */
Post.updatePostreply = function(arr,callback){
    let uploadSql = `update t_post set postReply=? where postId= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updatePostreply error:' + err);
            return;
        }
        console.log('updatePostreply success');
        callback(err,rows);
    });
};

/**
 * 根据标题查询帖子
 * @param arr
 * @param callback
 */
Post.selectPostbyTitle = function (arr,callback){
    let selectSql = `SELECT * FROM t_post WHERE postTitle LIKE ? AND plateId = ? order by postId DESC`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectPostbyTitle err:' + err);
            return;
        }
        console.log('selectPostbyTitle success.');
        callback(err,rows);
    });
};

/**
 *
 * @param callback
 */
Post.selectPosts = function (callback){
    let selectSql = `SELECT * FROM t_post INNER JOIN t_plate ON t_post.plateId = t_plate.plateId`;
    db.query(selectSql,function (err,rows,fields) {
        if (err){
            console.log('selectPosts err:' + err);
            return;
        }
        console.log('selectPosts success.');
        callback(err,rows);
    });
};
module.exports = Post;
