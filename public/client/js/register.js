/*
 * 作者：张慧珍
 * 创建时间：2019-02-19
 * 版本：[1.0,2019-02-19]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let useremail = document.getElementById('useremail'),
    btn_vcode = document.getElementById('btn_vcode'),
    vcode = document.getElementById('vcode'),
    userpwd = document.getElementById('userpwd'),
    userpwd1 = document.getElementById('userpwd1'),
    btn_register = document.getElementById('btn_register'),
    userAgreement = document.getElementById('userAgreement');

let code = '';

useremail.addEventListener('input',function () {
    btn_vcode.removeAttribute('disabled');
});
btn_vcode.addEventListener('click',function () {
    $.ajax({
        url: '/client/docode',
        type: 'get',
        data:{
            useremail: useremail.value
        },
        dataType: 'json',
    }).
    done(function (data) {
        console.log(data);
        code = data.code;
    });
});

let allValue = function (){
   // console.log(useremail.value);
    //console.log(userAgreement.checked);
    if (useremail.value && vcode.value && userpwd.value && userpwd1.value && userAgreement.checked) {
        btn_register.removeAttribute('disabled');
    } else {
        btn_register.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
});
$('body').on('change','input[type=checkbox]',function () {
    allValue();
});
