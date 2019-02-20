/*
 * 作者：张慧珍
 * 创建时间: 2019-02-19
 * 版本: [1.0,2019-02-19]
 * 版权: @肥羊不绵
 * 描述:
 * */
"use strict";



$('.z-inline').on('mouseover','span',function () {
    $(this).attr('class','text-primary');
}).on('mouseleave','span',function () {
    $(this).attr('class','text-muted');
});


$('#to_register').on('click',function () {
    window.location.href = './register.html';
});

$('#to_getpassword').on('click',function () {
    window.location.href = './getpassword.html';
});

$('#btn_login').on('click',function () {

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