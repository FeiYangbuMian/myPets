/*
 * 作者：FeiYang
 * 创建时间：2019-04-20
 * 版本：[1.0,2019-04-20]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let myinfo = {};
let type;
let userName;
window.onload = function () {
    let href = window.location.href;
    type = parseInt(href.slice(-1));
    myInfo();
    myPost();
    myReply();
    replyMe();
};


function initial() {
    console.log('initial');
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

    // 标签切换，分页隐藏与显示
    $('#myTab a').click(function (e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
      //  console.log($(this).tab());
        let type = $(this).tab().attr('data-type');
        let pmp =  $('.page-mypost'),
            pmr = $('.page-myreply'),
            prm =  $('.page-replyme');
        switch (type) {
            case '2':
                pmp.removeClass('hidden');
                pmr.addClass('hidden');
                prm.addClass('hidden');
                break;
            case '3':
                pmp.addClass('hidden');
                pmr.removeClass('hidden');
                prm.addClass('hidden');
                break;
            case '4':
                pmp.addClass('hidden');
                pmr.addClass('hidden');
                prm.removeClass('hidden');
                break;
            default:
                pmp.addClass('hidden');
                pmr.addClass('hidden');
                prm.addClass('hidden');
                break;
        }
    });

    // 个人信息修改
    $('#formyinfo').on('click','.onmodify',function () {
        $(this).parents('.modify').addClass('hidden').siblings('.confirm').removeClass('hidden');
    }).on('click','.oncancel',function () {
        $(this).parents('.confirm').addClass('hidden').siblings('.modify').removeClass('hidden');
    });

    $('.forphoto').on('change','#userPhoto',function () {
        let objFile = $(this).val();
        let objSize = $(this)[0].files[0].size;
        console.log($(this)[0].files[0]);
        let objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
        let formData = new FormData(document.forms.namedItem("picForm"));
        console.log(formData);
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

    $('.forbirth').on('click','.onconfirm',function (e) {
        // e.preventDefault();
        let user = myinfo;
        user.userBirth = $('#userBirth').val();
        console.log(user);
        if (!user.userBirth){
            alert('不可为空');
            return;
        }
        domodify(user,user.userBirth,$(this));
    });

    $('.forarea').on('click','.onconfirm',function () {
        let province = $('#province option:selected').val(),
            city = $('#city option:selected').val();
        let user = myinfo;
        user.userArea = province+ city;
        if (!user.userArea){
            alert('不可为空');
            return;
        }
        console.log(user);
        domodify(user,user.userArea,$(this));
    }).distpicker({
        autoSelect: false
    });

    $('.forqq').on('click','.onconfirm',function () {
        console.log('qq');
        let user = myinfo;
        user.userQQ = $('#userQQ').val();
        if (!user.userQQ){
            alert('不可为空');
            return;
        }
        console.log(user);
        domodify(user,user.userQQ,$(this));
    });

    $('.forwechat').on('click','.onconfirm',function () {
        let user = myinfo;
        user.userWechat = $('#userWechat').val();
        if (!user.userWechat){
            alert('不可为空');
            return;
        }
        console.log(user);
        domodify(user,user.userWechat,$(this));
    });

    // 未读消息跳转
    $('#forreplyme').on('click','li',function () {
        let replyId = $(this).attr('data-id'),
            url = $(this).attr('data-url');
        doread(replyId,url);
    });


    // 反馈信息
    $('#do_back').on('click',function () {
       let data={};
       let backContent = $('#backContent').val();
       if (!backContent) {
           alert('反馈内容不可为空！');
           return false;
       }
       data.userName = userName;
       data.backContent = backContent;
       doback(data);
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
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                // 个人信息
                myinfo = result.user;
                userName = myinfo.userName;
                let tem = $('#tem-myinfo').html();
                let out = Mustache.render(tem,myinfo);
                $('#formyinfo').html(out);

                $('#tohome').attr('href',`/post/home/${userName}`);
                $('.z-user').text(userName);
                setTimeout(initial,0);
                //initial();
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

                // 分页
                $('#formypost').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-mypost hidden',
                    insertAfter: '#formypost',
                    pageNumbers: true
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

                $('#formyreply').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-myreply hidden',
                    insertAfter: '#formyreply',
                    pageNumbers: true
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

                $('#forreplyme').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-replyme hidden',
                    insertAfter: '#forreplyme',
                    pageNumbers: true
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
    console.log(data);
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

/**
 * 修改头像信息
 * @param formData
 */
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
            $('#photo').attr('src', `../../image/userPhoto/${result}`);
            /*if (result.code === 0) {
                alert(result.text);
            } else {
                $('#photo').attr('src', `../../image/userPhoto/${result.data}`);
            }*/
        },
        error: function (err) {
            console.log(err);
        }
    });
}

/**
 * 跳转并设置为已读
 * @param replyId
 * @param url
 */
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


function doback(data) {
    $.ajax({
        url: `/client/doback`,
        type: 'post',
        data:JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                alert('反馈成功');
                $('#backContent').val('');
            }
        }
    });
}
