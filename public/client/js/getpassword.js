/*
 * 作者：张慧珍
 * 创建时间: 2019-02-22
 * 版本: [1.0,2019-02-22]
 * 版权: @肥羊不绵
 * 描述:
 * */
"use strict";

let useremail = document.getElementById('useremail'),
    btn_vcode = document.getElementById('btn_vcode'),
    vcode = document.getElementById('vcode'),
    userpwd = document.getElementById('userpwd'),
    userpwd1 = document.getElementById('userpwd1'),
    btn_to_login = document.getElementById('btn_to_login'),
    to_login = document.getElementById('to_login');


$('.z-inline').on('mouseover','span',function () {
    $(this).attr('class','text-primary');
}).on('mouseleave','span',function () {
    $(this).attr('class','text-muted');
});

btn_vcode.addEventListener('click',function () {

});

to_login.addEventListener('click',function () {
    window.location.href = '/login';
});

let allValue = function (){
    if (useremail.value && vcode.value && userpwd.value && userpwd1.value) {
        btn_to_login.removeAttribute('disabled');
    } else {
        btn_to_login.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
});

btn_to_login.addEventListener('click',function () {
    let uemail = useremail.value,
        upwd = userpwd.value;

    console.log(uemail,upwd);
    window.location.href = '/login';

});