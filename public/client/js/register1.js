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
    useraddress = document.getElementById('useraddress'),
    btn_next = document.getElementById('btn_next');


let allValue = function (){
    if (username.value && userbrith.value && useraddress.value) {
        btn_register.removeAttribute('disabled');
    } else {
        btn_register.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
});




btn_next.addEventListener('click',function () {
    let usersex = $("input[name='usersex']:checked").val();
    let data = {
        'username':username.value,
        'usersex':usersex,
        'userbrith':userbrith.value,
        'useraddress':useraddress.value
    };
    console.log(data);
   $.get('/register2',data,function (result) {
       console.log(result);
   });

});
