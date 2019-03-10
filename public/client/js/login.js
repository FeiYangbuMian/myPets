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
    autolog = document.getElementById('autolog'),
    to_register = document.getElementById('to_register'),
    to_getpassword = document.getElementById('to_getpassword');


$('.z-inline').on('mouseover','span',function () {
    $(this).attr('class','text-primary');
}).on('mouseleave','span',function () {
    $(this).attr('class','text-muted');
});

to_register.addEventListener('click',function () {
    window.location.href = '/register';
});

to_getpassword.addEventListener('click',function () {
    window.location.href = '/getpassword';
});

username.addEventListener('input',function () {
    if (username.value && userpwd.value) {
        console.log(username.value);
        console.log(userpwd.value);
        btn_login.removeAttribute('disabled');
    } else {
        btn_login.setAttribute('disabled','disabled');
    }
});

userpwd.addEventListener('input',function () {
    if (username.value && userpwd.value) {
        console.log(username.value);
        console.log(userpwd.value);
        btn_login.removeAttribute('disabled');
    } else {
        btn_login.setAttribute('disabled','disabled');
    }
});

/*
btn_login.addEventListener('click',function () {
    let uname = username.value,
        upwd = userpwd.value;
    let auto = autolog.checked;

    console.log(uname,upwd,auto);


   // ajax登录校验
    $.post("/dologin",{
        "username":uname,
        "userpwd":upwd
    },function(result){
        console.log(result);
        if (result.code == '0') {
            window.location.href=`index?id=${result.custom.id}`;
        } else {
            alert(result.text);
        }
    });
});
*/
