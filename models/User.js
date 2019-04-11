/*
 * 作者：张慧珍
 * 创建时间：2019-02-20
 * 版本：[1.0,2019-02-20]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function User(user){
    this.username = user.username;
    this.userpwd = user.userpwd;
    this.userbrith = user.userbrith;
    this.userstatus = user.userstatus;
    this.userphoto = user.userphoto;
    this.userqq = user.userqq;
    this.userwechat = user.userwechat;
    this.useremail = user.useremail;
    this.userarea = user.userarea;
    this.userstart = user.userstart;
    this.userstate = user.userstate;
}

/**
 * 判断用户是否已存在
 * @param username
 * @param callback
 */

User.selectUserbyName = function (username,callback){
    let selectSql = `SELECT * FROM t_user WHERE userName= ? `;
    db.query(selectSql,[username],function (err,rows,fields) {
        if (err){
            console.log('selectUserbyName err:' + err);
            return;
        }
        console.log('selectUserbyName success');
        callback(err,rows);
    });
};

/**
 * 登录判断
 * @param arr  [用户名，密码]
 * @param callback
 */
User.selectUser = function (arr,callback){
    let selectSql = `SELECT * FROM t_user WHERE userName= ? and userPwd = ? `;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectUser err:' + err);
            return;
        }
        console.log('selectUser success');
        callback(err,rows);
    });
};

/**
 * 判断邮箱是否存在
 * @param arr [邮箱]
 * @param callback
 */
User.selectUserbyEmail = function (arr,callback){
    let selectSql = `SELECT * FROM t_user WHERE userEmail= ?`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectUserbyEmail err:' + err);
            return;
        }
        console.log('selectUserbyEmail success');
        callback(err,rows);
    });
};


/**
 * 修改密码
 * @param arr 密码、邮箱
 * @param callback
 */

User.updateUserpwd = function (arr,callback){
    console.log(arr);
  let uploadSql = `update t_user set userPwd= ? where userEmail= ? `;
  db.query(uploadSql,arr,function (err,rows,fields) {
      if (err){
          console.log('uploadUserpwd err:' + err);
          return;
      }
      console.log('uploadUserpwd success');
      callback(err,rows);
  });
};

/**
 * 注册第一步
 * @param arr 用户名，注册时间，密码，邮箱
 * @param callback
 */
User.insertUser = function(arr,callback){
    let insertSql = `insert into t_user (userName,userStart,userPwd,userEmail)values(?,?,?,?)`;
    db.query(insertSql,arr,function (err,rows,fields) {
        if (err){
            console.log('insertUser err:' + err);
            return;
        }
        console.log('insertUser success');
        console.log(rows);
        callback(err,rows);
    });
};

/**
 * 修改头像
 * @param arr [用户头像，用户邮箱]
 * @param callback
 */
User.updateUserphoto = function (arr,callback){
    console.log(arr);
    let uploadSql = `update t_user set userPhoto= ? where userEmail= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updateUserphoto error:' + err);
            return;
        }
        console.log('updateUserphoto success');
        callback(err,rows);
    });
};

/**
 * 修改基本信息
 * @param arr [用户名，出生日，所在地，用户邮箱]
 * @param callback
 */
User.updateUser = function (arr,callback){
    console.log(arr);
    let uploadSql = `update t_user set userName= ?,userBrith=?,userArea=? where userEmail= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updateUser error:' + err);
            return;
        }
        console.log('updateUser success');
        callback(err,rows);
    });
};

module.exports = User;
