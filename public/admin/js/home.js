/*
 * 作者：张慧珍
 * 创建时间：2019-04-26
 * 版本：[1.0,2019-04-26]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

window.onload = function () {

    userInfo();
    plateInfo();
    postInfo();
    replyInfo();

    initial();
};


function initial() {

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
            default:break;
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
                    containerClass: 'pagination-container page-users',
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
