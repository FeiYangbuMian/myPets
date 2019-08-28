/*
 * 作者：FeiYang
 * 创建时间：2019-04-03
 * 版本：[1.0,2019-04-03]
 * 版权：@肥羊不绵
 * 描述：
 * */

const db = require('../middleware/db');

function Plate(plate){
    this.plateId = plate.plateId;
    this.plateName = plate.plateName;
    this.platePhoto = plate.platePhoto;
    this.plateIntro = plate.plateIntro;
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
 * @param plateId 板块ID
 * @param callback
 */

Plate.selectPlatebyId = function (plateId,callback){
    let selectSql = `SELECT * FROM t_plate WHERE plateId= ? `;
    db.query(selectSql,[plateId],function (err,rows,fields) {
        if (err){
            console.log('selectPlatebyplateId err:' + err);
            return;
        }
        console.log('selectPlatebyplateId success');
        callback(err,rows);
    });
};


/**
 * 板块信息 修改
 * @param arr
 * @param callback
 */
Plate.updatePlate = function (arr,callback){
    console.log(arr);
    let uploadSql = `update t_plate set plateName=?,plateIntro=? where plateId= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updatePlate error:' + err);
            return;
        }
        console.log('updatePlate success.');
        callback(err,rows);
    });
};

Plate.updatePlatephoto = function(arr,callback){
    console.log(arr);
    let uploadSql = `update t_plate set platePhoto= ? where plateId= ? `;
    db.query(uploadSql,arr,function (err,rows,fields) {
        if (err){
            console.log('updatePlatephoto error:' + err);
            return;
        }
        console.log('updatePlatephoto success.');
        callback(err,rows);
    });
};

module.exports = Plate;
