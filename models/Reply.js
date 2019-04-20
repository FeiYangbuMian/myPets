/*
 * 作者：张慧珍
 * 创建时间：2019-04-15
 * 版本：[1.0,2019-04-15]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function Reply(reply){
    this.replyId = reply.replyId;
    this.replyContent = reply.replyContent;
    this.replyPhoto = reply.replyPhoto;
    this.replyTime = reply.replyTime;
    this.replyFloor = reply.replyFloor;
    this.replyState = reply.replyState;
    this.postId = reply.postId;
    this.userNameF = reply.userNameF;
    this.userNameT = reply.userNameT;
}

/**
 * 评论
 * @param arr
 * @param callback
 */
Reply.insertReply = function(arr,callback) {
    let insertSql = `insert into t_reply (replyContent,replyPhoto,replyTime,replyFloor,replyState,postId,userNameF,userNameT) values (?,?,?,?,?,?,?,?)`;
    db.query(insertSql,arr,function (err,rows,fields) {
        if (err){
            console.log('insertPost err:' + err);
            return;
        }
        console.log('insertPost success.');
        callback(err,rows);
    });
};


/**
 * 帖子的评论
 * @param arr
 * @param callback
 */
Reply.selectReplybyPostid = function(arr,callback){
    let selectSql = `SELECT r.replyId,r.replyContent,r.replyPhoto,r.replyTime,r.replyFloor,r.replyState,r.postId,r.userNameF,r.userNameT,u.userPhoto FROM t_reply AS r,t_user AS u WHERE r.postId= ? and r.userNameF=u.userName and r.replyState = 0 order by r.replyId ASC`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectReplybyPostid err:' + err);
            return;
        }
        console.log('selectReplybyPostid success');
        callback(err,rows);
    });
};

Reply.selectReplyLOL = function (arr,callback){
    let selectSql = `SELECT * FROM t_reply WHERE postId= ?,replyFloor=? and replyState = 1`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectReplyid err:' + err);
            return;
        }
        console.log('selectReplyid success');
        callback(err,rows);
    });
};

/**
 * 查询未读消息
 * @param arr 用户名
 * @param callback
 */
Reply.selectIsread = function(arr,callback){
    let selectSql = `SELECT * FROM t_reply WHERE userNameT = ? and isRead = 0`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectIsread err:' + err);
            return;
        }
        console.log('selectIsread success');
        console.log(rows.length);
        callback(err,rows);
    });
};

/**
 * 查询我的回复
 * @param arr 用户名
 * @param callback
 */
Reply.selectMyreply = function(arr,callback){
    let selectSql = `SELECT * FROM t_reply WHERE userNameF = ?`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectMyreply err:' + err);
            return;
        }
        console.log('selectMyreply success');
        console.log(rows.length);
        callback(err,rows);
    });
};

module.exports = Reply;
