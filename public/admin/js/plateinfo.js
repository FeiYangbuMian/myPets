/*
 * 作者：张慧珍
 * 创建时间：2019-04-28
 * 版本：[1.0,2019-04-28]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";
let info = {};
let plateId;
window.onload = function () {
    console.log('!!!!!');
    let href = window.location.href;
    plateId = parseInt(href.slice(-4));
    console.log(plateId);

    plateInfo(plateId);
};


function initial() {
    $('a').click(function (e) {
        e.preventDefault();
    });

    $('#goback').on('click',function () {
        window.history.go(-1);
    });

    // 个人信息修改
    $('#forinfo').on('click','.onmodify',function () {
        $(this).parents('.modify').addClass('hidden').siblings('.confirm').removeClass('hidden');
    }).on('click','.oncancel',function () {
        $(this).parents('.confirm').addClass('hidden').siblings('.modify').removeClass('hidden');
    });

    $('.forphoto').on('change','#platePhoto',function () {
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

    $('.forname').on('click','.onconfirm',function () {
        let plate = info;
        plate.plateName = $('#plateName').val();
        if (!plate.plateName){
            alert('不可为空');
            return;
        }
        console.log(plate);
        domodify(plate,plate.plateName,$(this));
    });

    $('.forintro').on('click','button',function () {
        let plate = info;
        plate.plateIntro = $('#plateIntro').val();
        if (!plate.plateIntro){
            alert('不可为空');
            return;
        }
        console.log(plate);
        domodify(plate,plate.plateIntro,$(this));
    });
}

/**
 * 获取板块信息
 */
function plateInfo(plateId) {
    console.log('plateInfo');
    $.ajax({
        url: `/admin/plateinfo`,
        type: 'post',
        data:JSON.stringify({
            'plateId':plateId,
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                // 个人信息
                info = result.info;
                let tem = $('#tem-info').html();
                let out = Mustache.render(tem,info);
                $('#forinfo').html(out);
                $('#adminName').html(`管理员：${result.user.userName}`);
                initial();
            }
        }
    });
}




/**
 * 修改板块信息
 * @param data 用户信息
 * @param content 修改的那块
 * @param that 点击的那块
 */
function domodify(data,content,that) {
    $.ajax({
        url: `/admin/domodify`,
        type: 'post',
        data: JSON.stringify(data),
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
        url: '/admin/dophoto',
        data: formData,
        processData: false,
        async: false,
        cache: false,
        contentType: false,
        success: function (result) {
            console.log(result);
            $('#photo').attr('src', `../../image/${result}`);
            /*if (result.code === 0) {
                alert(result.text);
            } else {
                $('#photo').attr('src', `../../image/${result.data}`);
            }*/
        },
        error: function (err) {
            console.log(err);
        }
    });
}
