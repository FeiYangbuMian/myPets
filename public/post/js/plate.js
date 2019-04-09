/*
 * 作者：张慧珍
 * 创建时间：2019-04-03
 * 版本：[1.0,2019-04-03]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";


window.onload = function () {
    let href = window.location.href;
    let plateid = href.slice(-3);
    console.log(plateid);
    $.ajax({
        url: '/post/doplate',
        type: 'post',
        data:JSON.stringify({
            'plateid':plateid
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let data = result.data;
                let tem = $('#template').html();
                let out = Mustache.render(tem,data);
                $('#plates').append(out);
            }
        }
    });
};
