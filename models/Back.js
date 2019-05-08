/*
 * 作者：张慧珍
 * 创建时间：2019-05-03
 * 版本：[1.0,2019-05-03]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function Back(back){
    this.backId = back.backId;
    this.backContent = back.backContent;
    this.userName = back.userName;
}

/**
 * 查询全部反馈信息
 * @param callback
 */
Back.selectBack = function (callback){
    let selectSql = `SELECT * FROM t_back`;
    db.query(selectSql,function (err,rows,fields) {
        if (err){
            console.log('selectBack err:' + err);
            return;
        }
        console.log('selectBack success.');
        callback(err,rows);
    });
};
/**
 * 新增反馈
 * @param arr
 * @param callback
 */
Back.insertBack = function (arr,callback){
    let insertSql = `insert into t_back (backContent,userName) values (?,?)`;
    db.query(insertSql,arr,function (err,rows,fields) {
        console.log(arr);
        if (err){
            console.log('insertBack err:' + err);
            return;
        }
        console.log('insertBack success.');
        callback(err,rows);
    });
};
module.exports = Back;
