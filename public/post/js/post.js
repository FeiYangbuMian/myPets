/*
 * 作者：张慧珍
 * 创建时间：2019-04-14
 * 版本：[1.0,2019-04-14]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let postId = '',
    userName='',
    userNameT = '',
    userPhoto='';
let replyFloor = 0;

window.onload = function () {
    let href = window.location.href;
    let index = href.lastIndexOf('\/');
    postId = href.substring(index+1,href.length);
    docount();
    dopost(postId);

    // 评论帖子
    $('#up_reply').on('click',function () {
        let data = {};
        data.replyContent = $('#replyContent').val();
        data.replyPhoto = '';
        data.replyTime = '';
        data.replyFloor = replyFloor + 1; //楼层
        data.replyState = 0; //0评论 1楼中楼
        data.postId = postId;
        data.userNameF = userName;
        data.userNameT = '';
        upreply(data);

    });

    // 楼中楼
    $('#up_reply').on('li',function () {
        let data = {};
        data.replyContent = $('#replyContent').val();
        data.replyPhoto = '';
        data.replyTime = '';
        data.replyFloor = replyFloor; //楼层
        data.replyState = 0; //0评论 1楼中楼
        data.postId = postId;
        data.userNameF = userName;
        data.userNameT = userNameT;
        upreply(data);

    });
}

/**
 * 获取帖子全部信息
 * @param postId
 */
function dopost(postId) {
    $.ajax({
        url: `/post/dopost`,
        type: 'post',
        data:JSON.stringify({
            'postId':postId
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let info = result;
                let tem = $('#tem-post').html();
                let out = Mustache.render(tem,info);
                $('#forpost').html(out);
                userNameT = info.userName;
               // document.title = `萌宠战记-${info.plateName}`;

                $('#forreply').html('');
                let list = result.list;
                replyFloor = list.length;
                let tem2 = $('#tem-reply').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem2,v);
                    $('#forreply').append(out);
                });
                userName = result.user.userName;
                userPhoto = result.user.userPhoto;
                $('#foruser').text(userName);
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
}

/**
 * 评论帖子
 * @param data
 */
function upreply(data) {
    $.ajax({
        url: `/post/upreply`,
        type: 'post',
        data:JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                dopost(postId);
                $('input,textarea').val('');
            }
        }
    });
}


/**
 * 未读消息数目
 */
function docount() {
    $.ajax({
        url: `/post/docount`,
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                $('#count').text(result.count);
            }
        }
    });
}
