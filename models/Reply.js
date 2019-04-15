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
 * 帖子的评论
 * @param arr
 * @param callback
 */
Reply.selectReplybyPostid = function(arr,callback){
    let selectSql = `SELECT * FROM t_reply WHERE postId= ? and replyState = 0 order by replyFloor DESC`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectReplyid err:' + err);
            return;
        }
        console.log('selectReplyid success');
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


module.exports = Reply;
