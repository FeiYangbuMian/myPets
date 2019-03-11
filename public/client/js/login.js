/*
 * 作者：张慧珍
 * 创建时间：2019-02-19
 * 版本：[1.0,2019-02-19]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let username = document.getElementById('username'),
    userpwd = document.getElementById('userpwd'),
    btn_login = document.getElementById('btn_login'),
    autolog = document.getElementById('autolog');


$('.container').on('input','input',function () {
    if (username.value && userpwd.value) {
        console.log(username.value+','+userpwd.value);
        btn_login.removeAttribute('disabled');
    } else {
        btn_login.setAttribute('disabled','disabled');
    }
});

$('#btn_login').on('click',function () {
    let data = {
        userpwd: userpwd.value,
        username: username.value
    };
    console.log(JSON.stringify(data));

    $.ajax({
        url: '/client/dologin',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: false,
    }).done(function (data) {
            alert(data);
        }
    );
});
