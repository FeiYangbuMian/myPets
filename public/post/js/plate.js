/*
 * 作者：张慧珍
 * 创建时间：2019-04-03
 * 版本：[1.0,2019-04-03]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let userName = '',
    plateId = '';

window.onload = function () {

    let href = window.location.href;
    plateId = parseInt(href.slice(-4));
    console.log(plateId);

    docount();
    doplate(plateId);
    $('body').on('click','a',function (e) {
        e.preventDefault();
    });

    $('#toplate').on('click','li',function () {
        $(this).addClass('active').siblings().removeClass('active');
        plateId = $(this).attr('data-plate');
        doplate(plateId);
    });

    $('#up_post').on('click',function () {
        let data = {};
        data.plateId = plateId;
        data.userName = userName;
        data.postTitle = $('#postTitle').val();
        data.postContent = $('#postContent').val();
        data.postPhoto = '';
        data.postStart = '';
        data.postLimit = 0;
        console.log(data);
        uppost(data);
    });

    $('#forlist').on('click','li',function () {
        let postId = $(this).attr('data-id');
        window.location.href = `/post/plate/${plateId}/${postId}`;
    });

   /* let postPhoto = document.getElementById('postPhoto');
    postPhoto.addEventListener('change', function() {
        let t_files = this.files;
        console.log(t_files);
        var str = '';
        for (let i = 0, len = t_files.length; i < len; i++) {
            console.log(t_files[i]);
            str += '<li>名称：' + t_files[i].name + '大小' + t_files[i].size / 1024 + 'KB</li>';
        }
        document.getElementById('content').appendChild(str);
    }, false);*/


};

function doplate(plateId) {
    $.ajax({
        url: `/post/doplate`,
        type: 'post',
        data:JSON.stringify({
            'plateId':plateId
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                $('#forlist').html('');
                let info = result.info;
                let tem = $('#tem-plate').html();
                let out = Mustache.render(tem,info);
                $('#forplate').html(out);
                document.title = `萌宠战记-${info.plateName}`;
                $('#plateName').text(`#${info.plateName}`);

                let list = result.list;

                let tem2 = $('#tem-list').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem2,v);
                    $('#forlist').append(out);
                });
                userName = result.user.userName;
                $('#foruser').text(userName);
            }
        }
    });
}

function uppost(data) {
    $.ajax({
        url: `/post/uppost`,
        type: 'post',
        data:JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                doplate(plateId);
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
