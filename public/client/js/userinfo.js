/*
 * 作者：张慧珍
 * 创建时间：2019-04-20
 * 版本：[1.0,2019-04-20]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let myinfo = {};
let type;
window.onload = function () {
    let href = window.location.href;
    type = parseInt(href.slice(-1));
    myInfo();
    myPost();
    myReply();
    replyMe();
};


function initial() {
    switch (type) {
        case 1:
            $('#formyinfo').addClass('active');
            break;
        case 2:
            $('#formypost').addClass('active');
            break;
        case 3:
            $('#formyreply').addClass('active');
            break;
        case 4:
            $('#forreplyme').addClass('active');
            break;
        default:break;
    }


    // 个人信息修改
    $('#formyinfo').on('click','.onmodify',function () {
        $(this).parents('.modify').addClass('hidden').siblings('.confirm').removeClass('hidden');
    });
    $('.forphoto').on('change','#userPhoto',function () {
        let objFile = $(this).val();
        let objSize = $(this)[0].files[0].size;
        console.log($(this)[0].files[0]);
        let objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
        let formData = new FormData(document.forms.namedItem("picForm"));
        console.log(objFile);
        if (!(objType === '.jpg' || objType === '.png')) {
            alert("请上传jpg、png类型图片");
            return false;
        } else if(objSize>1024*1024*3){
            alert("上传的图片过大，请在3M以内。");
            return false;
        } else {
            dophoto(formData);
        }

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



    // 未读消息跳转
    $('#forreplyme').on('click','li',function () {
        let replyId = $(this).attr('data-id'),
            url = $(this).attr('data-url');
        doread(replyId,url);
    });
}

/**
 * 获取我的信息
 */
function myInfo() {
    $.ajax({
        url: `/client/myinfo`,
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

                initial();
            }
        }
    });
}

/**
 * 获取我的发帖
 */
function myPost() {
    $.ajax({
        url: `/client/mypost`,
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.list;
                let tem1 = $('#tem-mypost').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem1,v);
                    $('#formypost').append(out);
                });
            }
        }
    });
}

/**
 * 获取我的回复
 */
function myReply() {
    $.ajax({
        url: `/client/myreply`,
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.list;
                let tem1 = $('#tem-myreply').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem1,v);
                    $('#formyreply').append(out);
                });
            }
        }
    });
}

/**
 * 获取未读消息
 */
function replyMe() {
    $.ajax({
        url: `/client/replyme`,
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.list;
                let tem1 = $('#tem-replyme').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem1,v);
                    $('#forreplyme').append(out);
                });
            }
        }
    });
}

/**
 * 修改个人信息
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

function dophoto(formData) {
    $.ajax({
        type: 'post',
        url: '/client/dophoto',
        data: formData,
        processData: false,
        async: false,
        cache: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            if (result.code === 0) {
                alert(result.text);
            } else {
                $('#photo').attr('src', `../../image/userPhoto/${result.data}`);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function doread(replyId,url) {
    $.ajax({
        url: `/post/doread`,
        type: 'post',
        data:JSON.stringify({
            replyId:replyId
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                window.location.href = url;
            }
        }
    });
}
