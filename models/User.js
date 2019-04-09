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

User.selectUserbyUsername = function (username,callback){
    let selectSql = `SELECT * FROM t_user WHERE userName= ? `;
    db.query(selectSql,[username],function (err,rows,fields) {
        if (err){
            console.log('selectUserbyUsername err:' + err);
            return;
        }
        console.log('selectUserbyUsername success');
        callback(err,rows);
    });
};

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



module.exports = User;
