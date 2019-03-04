/*
 * 作者：张慧珍
 * 创建时间：2019-02-28
 * 版本：[1.0,2019-02-28]
 * 版权：@肥羊不绵
 * 描述：链接mysql
 * */

var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'pets',
});

db.connect(function(err) {
    if (err) {
        console.error('数据库连接失败' + err.stack);
        return;
    }
    console.log('数据库连接成功' + connection.threadId);
});

let selectUser = 'SELECT * FROM t_user';
/*let sql = sqllan;
if (!sql) return;*/

/**
 * 向数据库发送sql语句，并且用回调函数返回结果
 * err错误结果
 * rows具体的返回结果：数组里多个json
 * fields返回每个数据的解释
 */
db.query(selectUser, function (err, rows,fields) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(rows);
});

db.end(function (err) {
    if (err){
        console.log(err);
    } else {
        console.log('连接关闭');
    }
});

module.exports = db;
