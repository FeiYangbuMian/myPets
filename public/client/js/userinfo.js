/*
 * 作者：张慧珍
 * 创建时间：2019-04-20
 * 版本：[1.0,2019-04-20]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let myinfo = {};

window.onload = function () {
    userinfo();
};

function initial() {
    // 个人信息修改
    $('#formyinfo').on('click','.onmodify',function () {
        $(this).parents('.modify').addClass('hidden').siblings('.confirm').removeClass('hidden');
    });
    $('.forphoto').on('click','.onconfirm',function () {
        let content='';
        $(this).parents('.confirm').addClass('hidden').siblings('.modify').removeClass('hidden');
    });

    $('.forbrith').on('click','.onconfirm',function (e) {
        // e.preventDefault();
        console.log('...');
        let user = myinfo;
        user.userBrith = $('#userBrith').val();
        console.log(user);
        domodify(user,user.userBrith,$(this));
    });

    $('.forarea').on('click','.onconfirm',function () {
        let province = $('#province option:selected').val(),
            city = $('#city option:selected').val();
        let user = myinfo;
        user.userArea = province+ city;
        console.log(user);
        domodify(user,user.userArea,$(this));
    });

    $('.forqq').on('click','button',function () {
        console.log('qq');
        let user = myinfo;
        user.userQQ = $('#userQQ').val();
        console.log(user);
        domodify(user,user.userQQ,$(this));
    });

    $('.forwechat').on('click','.onconfirm',function () {
        let user = myinfo;
        user.userWechat = $('#userWechat').val();
        console.log(user);
        domodify(user,user.userWechat,$(this));
    });
}

/**
 * 获取我的信息，发帖，回复
 */
function userinfo() {
    $.ajax({
        url: `/client/userinfo`,
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                // 个人信息
                myinfo = result.user;
                let tem = $('#tem-myinfo').html();
                let out = Mustache.render(tem,myinfo);
                $('#formyinfo').html(out);

                //我的发帖
                let mypost = result.mypost;
                let tem1 = $('#tem-mypost').html();
                $.each(mypost,function (k,v) {
                    let out = Mustache.render(tem1,v);
                    $('#formypost').append(out);
                });

                //我的回复
                let replyme = result.replyme;

                initial();

            }
        }
    });
}

/**
 *
 * @param data 用户信息
 * @param content 修改的那块
 * @param that 点击的那块
 */
function domodify(data,content,that) {
    $.ajax({
        url: `/client/domodify`,
        type: 'post',
        data:JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                that.parents('.confirm').addClass('hidden').siblings('.modify').removeClass('hidden').children('span').text(content);
            }
        }
    });
}
