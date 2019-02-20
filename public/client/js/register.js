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
    userAgreement = document.getElementById('userAgreement'),
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
    if (useremail.value && vcode.value && userpwd.value && userpwd1.value && userAgreement.checked) {
        console.log(useremail.value);
        console.log(userAgreement.checked);
        btn_login.removeAttribute('disabled');
    } else {
        btn_login.setAttribute('disabled','disabled');
    }
};

useremail.addEventListener('input',function () {
    allValue();
});
vcode.addEventListener('input',function () {
    allValue();
});
userpwd.addEventListener('input',function () {
    allValue();
});
userpwd1.addEventListener('input',function () {
    allValue();
});



btn_register.addEventListener('click',function () {
    let uname = username.value,
        upwd = userpwd.value;
    let auto = autolog.checked;

    console.log(uname,upwd,auto);
    alert('欢迎光临');
    window.location.href = '/login';


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