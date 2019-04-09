/*
 * 作者：张慧珍
 * 创建时间：2019-04-03
 * 版本：[1.0,2019-04-03]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";


const db = require('../middleware/db');

function Plate(plate){
    this.plateid = plate.plateid;
    this.platename = plate.platename;
    this.platephoto = plate.platephoto;
    this.plateintro = plate.plateintro;
}

/**
 * 查询全部板块信息
 * @param callback
 */
Plate.selectPlate = function (callback){
    let selectSql = `SELECT * FROM t_plate`;
    db.query(selectSql,function (err,rows,fields) {
        if (err){
            console.log('selectPlate err:' + err);
            return;
        }
        console.log('selectPlate success.');
        callback(err,rows);
    });
};

/**
 * 根据id查询板块信息
 * @param plateid 板块ID
 * @param callback
 */

Plate.selectPlatebyPlateid = function (plateid,callback){
    let selectSql = `SELECT * FROM t_plate WHERE plateId= ? `;
    db.query(selectSql,[plateid],function (err,rows,fields) {
        if (err){
            console.log('selectPlatebyPlateid err:' + err);
            return;
        }
        console.log('selectPlatebyPlateid success');
        callback(err,rows);
    });
};

module.exports = Plate;
