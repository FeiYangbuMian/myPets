/*
 * 作者：张慧珍
 * 创建时间：2019-02-19
 * 版本：[1.0,2019-02-19]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let userName = document.getElementById('userName'),
    userPwd = document.getElementById('userPwd'),
    btn_login = document.getElementById('btn_login'),
    autolog = document.getElementById('autolog');


$('.container').on('input','input',function () {
    if (userName.value && userPwd.value) {
        console.log(userName.value+','+userPwd.value);
        btn_login.removeAttribute('disabled');
    } else {
        btn_login.setAttribute('disabled','disabled');
    }
});


$('#btn_login').on('click',function () {
    let data = {
        userPwd: userPwd.value,
        userName: userName.value
    };
    console.log(JSON.stringify(data));

    $.ajax({
        url: '/client/dologin',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                //window.location.href=`/post/home?userName=${result.userName}`;
                window.location.href=`/post/home/${result.userName}`;
            }
        }
    });
});
