/*
 * 作者：张慧珍
 * 创建时间：2019-02-20
 * 版本：[1.0,2019-02-20]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function User(user){
    this.userId = user.userId;
    this.userName = user.userName;
    this.userPwd = user.userPwd;
    this.userBirth = user.userBirth;
    this.userStatus = user.userStatus;
    this.userPhoto = user.userPhoto;
    this.userQQ = user.userQQ;
    this.userWechat = user.userWechat;
    this.userEmail = user.userEmail;
    this.userArea = user.userArea;
    this.userStart = user.userStart;
    this.userState = user.userState;
}

/**
 * 判断用户是否已存在
 * @param userName
 * @param callback
 */

User.selectUserbyName = function (userName,callback){
    let selectSql = `SELECT * FROM t_user WHERE userName= ? `;
    db.query(selectSql,[userName],function (err,rows,fields) {
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
          console.log('updateUserpwd err:' + err);
          return;
      }
      console.log('updateUserpwd success');
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
 * 修改基本信息 注册第二步
 * @param arr [用户名，出生日，所在地，用户邮箱]
 * @param callback
 */
User.updateUser = function (arr,callback){
    console.log(arr);
    let uploadSql = `update t_user set userName= ?,userBirth=?,userArea=? where userEmail= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updateUser error:' + err);
            return;
        }
        console.log('updateUser success');
        callback(err,rows);
    });
};


User.selectUserphoto = function (arr,callback){
    let selectSql = `SELECT userPhoto FROM t_user WHERE userName= ?`;
    db.query(selectSql,arr,function (err,rows,fields) {
        if (err){
            console.log('selectUserphoto error:' + err);
            return;
        }
        console.log('selectUserphoto success');
        callback(err,rows);
    });
};

/**
 * 个人信息 修改
 * @param arr
 * @param callback
 */
User.updateUserExtra = function (arr,callback){
    console.log(arr);
    let uploadSql = `update t_user set userBirth=?,userArea=?,userQQ=?,userWechat=? where userName= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updateUserExtra error:' + err);
            return;
        }
        console.log('updateUserExtra success');
        callback(err,rows);
    });
};

/**
 * 获取全部用户信息
 * @param callback
 */
User.selectUsers = function (callback){
    let selectSql = `SELECT * FROM t_user`;
    db.query(selectSql,function (err,rows,fields) {
        if (err){
            console.log('selectUsers err:' + err);
            return;
        }
        console.log('selectUsers success.');
        callback(err,rows);
    });
};

module.exports = User;
