/*
 * 作者：FeiYang
 * 创建时间：2019-04-26
 * 版本：[1.0,2019-04-26]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let myinfo = {};
window.onload = function () {
    myInfo();
    userInfo();
    plateInfo();
    postInfo();
    replyInfo();
    backInfo();

};


function initial() {
    $('a').click(function (e) {
        e.preventDefault();
    });

    // 标签切换，分页隐藏与显示
    $('#myTab a').click(function (e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
        console.log($(this).tab());
        let type = $(this).tab().attr('data-type');
        let pu =  $('.page-users'),
            ppl = $('.page-plates'),
            ppo = $('.page-posts'),
            pr = $('.page-replys');
        switch (type) {
            case '1':
                pu.removeClass('hidden');
                ppl.addClass('hidden');
                ppo.addClass('hidden');
                pr.addClass('hidden');
                break;
            case '2':
                pu.addClass('hidden');
                ppl.removeClass('hidden');
                ppo.addClass('hidden');
                pr.addClass('hidden');
                break;
            case '3':
                pu.addClass('hidden');
                ppl.addClass('hidden');
                ppo.removeClass('hidden');
                pr.addClass('hidden');
                break;
            case '4':
                pu.addClass('hidden');
                ppl.addClass('hidden');
                ppo.addClass('hidden');
                pr.removeClass('hidden');
                break;
            default:
                pu.addClass('hidden');
                ppl.addClass('hidden');
                ppo.addClass('hidden');
                pr.addClass('hidden');
                break;
        }
    });

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
        if (!user.userBirth){
            alert('不可为空');
            return;
        }
        console.log(user);
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

    $('.forqq').on('click','button',function () {
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

    $('#forplates').on('click','a',function () {
        let id = $(this).attr('id');
        window.location.href = `/admin/plateinfo?id=${id}`;
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
                let tem = $('#tem-myinfo').html();
                let out = Mustache.render(tem,myinfo);
                $('#formyinfo').html(out);
                $('#adminName').html(`管理员：${myinfo.userName}`);
                initial();
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

function userInfo() {
    $.ajax({
        url:'/admin/users',
        type:'post',
        contentType:'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {

                let list = result.users;
                let tem = $('#tem-user').html();
                $('#forusers tbody').html('');
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem,v);
                    $('#forusers tbody').append(out);
                });

                // 分页
                $('#forusers tbody').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-users hidden',
                    insertAfter: '#forusers',
                    pageNumbers: true
                });

            }
        },
    })
}

function plateInfo() {
    $.ajax({
        url:'/admin/plates',
        type:'post',
        contentType:'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.plates;
                let tem = $('#tem-plate').html();
                $('#forplates tbody').html('');
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem,v);
                    $('#forplates tbody').append(out);
                });

                // 分页
                $('#forplates tbody').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-plates hidden',
                    insertAfter: '#forplates',
                    pageNumbers: true
                });
            }
        },
    })
}

function postInfo() {
    $.ajax({
        url:'/admin/posts',
        type:'post',
        contentType:'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.posts;
                let tem = $('#tem-post').html();
                $('#forposts tbody').html('');
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem,v);
                    $('#forposts tbody').append(out);
                });

                // 分页
                $('#forposts tbody').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-posts hidden',
                    insertAfter: '#forposts',
                    pageNumbers: true
                });
            }
        },
    })
}
function replyInfo() {
    $.ajax({
        url:'/admin/replys',
        type:'post',
        contentType:'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.replys;
                let tem = $('#tem-reply').html();
                $('#forreplys tbody').html('');
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem,v);
                    $('#forreplys tbody').append(out);
                });

                // 分页
                $('#forreplys tbody').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-replys hidden',
                    insertAfter: '#forreplys',
                    pageNumbers: true
                });
            }
        },
    })
}

function backInfo() {
    $.ajax({
        url:'/admin/backs',
        type:'post',
        contentType:'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                let list = result.backs;
                let tem = $('#tem-back').html();
                $('#forbacks tbody').html('');
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem,v);
                    $('#forbacks tbody').append(out);
                });

                // 分页
                $('#forbacks tbody').paginathing({
                    perPage: 10, //每页几个
                    containerClass: 'pagination-container page-backs hidden',
                    insertAfter: '#forbacks',
                    pageNumbers: true
                });
            }
        },
    })
}
