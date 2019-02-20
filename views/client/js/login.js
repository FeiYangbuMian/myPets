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
    window.location.href = './register.html';
});

to_getpassword.addEventListener('click',function () {
    window.location.href = './getpassword.html';
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

btn_login.addEventListener('click',function () {
    let uname = username.value,
        upwd = userpwd.value;
    let auto = autolog.checked;

    console.log(uname,upwd,auto);
    alert('欢迎光临');
    window.location.href = './index.html';


    //ajax登录校验
    // $.post("/dologin",{
    //     "username":$('#user').val(),
    //     "password":$('#pwd').val()
    // },function(result){
    //     if(result==-1){
    //         alert("用户名不存在");
    //         $('#err').fadeIn(800);
    //         $('#err h3').html('用户名不在!请重试')
    //     }else if(result==0){
    //         alert("密码错误");
    //         $('#err').fadeIn(800);
    //         $('#err h3').html('密码错误!!请重新尝试登录')
    //     }else{
    //         alert("登录成功,马上进入首页!");
    //         window.location="/";
    //     }
    // });
});