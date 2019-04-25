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
let replyFloor,postReply;

window.onload = function () {
    let href = window.location.href;
    let index = href.lastIndexOf('\/');
    postId = href.substring(index+1,href.length);
    docount();
    dopost(postId);

    // 评论帖子
    $('#up_reply').on('click',function () {
        let data = {};
        let replyContent = $('#replyContent').val();
        if (!replyContent) {
            alert('内容不可为空');
            return ;
        }
        $('#postId').val(postId);
        $('#userNameF').val(userName);
        $('#replyFloor').val(replyFloor + 1);
        $('#postReply').val(postReply + 1);
        $('#userNameT').val(userNameT);
        let state = 0;
        $('#replyState').val(state);

        let formData = new FormData(document.forms.namedItem("addForm"));

        upreply(formData);

    });

    // 楼中楼
    $('#up_reply').on('li',function () {
        let data = {};
        data.replyContent = $('#replyContent').val();
        data.replyPhoto = '';
        data.replyTime = '';
        data.replyFloor = replyFloor; //楼层
        data.postReply = postReply + 1;
        data.replyState = 1; //0评论 1楼中楼
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
                let info = result.info;
                let tem = $('#tem-post').html();
                let out = Mustache.render(tem,info);
                $('#forpost').html(out);
                userNameT = info.userName;
                postReply = info.postReply;
                document.title = `萌宠战记-${info.postTitle}`;
                // 帖子详情的图片
                if (info.postPhoto) {
                    info.postPhoto =  info.postPhoto.split(',');
                    info.postPhoto.pop();
                    let imgs = info.postPhoto;
                    console.log(imgs);
                    let html='';
                    $.each(imgs,function (k,v) {
                        html += `<img src="/image/postPhoto/${v}" />`;
                        console.log(html);
                        $(`#forpost .z-post-imgs`).html(html);
                    });
                }


                $('#forreply').html('');
                let list = result.list;
                replyFloor = list.length;
                let tem2 = $('#tem-reply').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem2,v);
                    $('#forreply').append(out);

                    // 图片摁进去
                    if (v.replyPhoto) {
                        v.replyPhoto =  v.replyPhoto.split(',');
                        v.replyPhoto.pop();
                        let imgs = v.replyPhoto;
                        console.log(imgs);
                        let html='',key = k;
                        $.each(imgs,function (k,v) {
                            html += `<img src="/image/replyPhoto/${v}" />`;
                            $(`#forreply li:eq(${key}) .z-post-imgs`).html(html);
                        });
                    }
                });

                // 分页
                $('.pagination-container').remove();
                $('#forreply').paginathing({
                    perPage: 10, //每页几个
                    insertAfter: '#forreply',
                    pageNumbers: true
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
function upreply(formData) {
    $.ajax({
        url: `/post/upreply`,
        type: 'post',
        data:formData,
        dataType:'json',
        processData: false,  // 告诉JSLite不要去处理发送的数据
        contentType: false,   // 告诉JSLite不要去设置Content-Type请求头
        success:function(result){
            console.log(result);
            if (result.code===0){
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
