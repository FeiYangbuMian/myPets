/*
 * 作者：张慧珍
 * 创建时间：2019-03-02
 * 版本：[1.0,2019-03-02]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let username = document.getElementById('username'),
    userbrith = document.getElementById('userbrith'),
    useraddress = document.getElementById('useraddress');


let allValue = function (){
    if (username.value && userbrith.value && useraddress.value) {
        btn_next.removeAttribute('disabled');
    } else {
        btn_next.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
});
