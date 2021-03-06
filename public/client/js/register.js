/*
 * 作者：FeiYang
 * 创建时间：2019-02-19
 * 版本：[1.0,2019-02-19]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let userEmail = document.getElementById('userEmail'),
    btn_vcode = document.getElementById('btn_vcode'),
    vcode = document.getElementById('vcode'),
    userPwd = document.getElementById('userPwd'),
    userPwd1 = document.getElementById('userPwd1'),
    btn_register = document.getElementById('btn_register'),
    userAgreement = document.getElementById('userAgreement');

let code = '';  // 存放发送的验证码

userEmail.addEventListener('input',function () {
    btn_vcode.removeAttribute('disabled');
});

btn_vcode.addEventListener('click',function () {
    let reg =  /^(\w)+([-.]\w+)*@(\w)+((\.\w{2,4}){1,3})$/;
    if (!reg.test(userEmail.value)) {
        alert('邮箱格式不正确！');
        return;
    }
    $.ajax({
        url: '/client/docode',
        type: 'get',
        data:{
            userEmail: userEmail.value,
        },
        dataType: 'json',
    }).
    done(function (result) {
        console.log(result);
        if (result.code === 0){
            alert(result.text);
        } else {
            code = result.data.toString();
        }
    });
});

let allValue = function (){
    if (userEmail.value && vcode.value && userPwd.value && userPwd1.value && userAgreement.checked) {
        btn_register.removeAttribute('disabled');
    } else {
        btn_register.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
}).on('change','input[type=checkbox]',function () {
    allValue();
});

btn_register.addEventListener('click',function () {
    console.log(code);
    console.log(vcode.value);
    if (vcode.value!==code) {
        alert('验证码错误');
        return;
    }
    if (userPwd.value !== userPwd1.value) {
        alert('两次密码不一致');
        return;
    }
    let data = {
        userPwd: userPwd.value,
        userEmail: userEmail.value
    };
    console.log(JSON.stringify(data));

    $.ajax({
        url: '/client/doregister',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                window.location.href=`/client/register1?userEmail=${result.userEmail}`;
            }
        }
    });

});
