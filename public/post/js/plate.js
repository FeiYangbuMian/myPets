/*
 * 作者：FeiYang
 * 创建时间：2019-04-03
 * 版本：[1.0,2019-04-03]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let userName = '',
    plateId = '',
    url = '/post/dosort1';

window.onload = function () {

    let href = window.location.href;
    plateId = parseInt(href.slice(-4));
    console.log(plateId);

    docount();
    doplate(plateId);
    dosort(plateId,url);

    // 排序
    $('.sort').on('click','li',function (e) {
        e.preventDefault();
        $('#likeTitle').val('');
        $(this).addClass('active').siblings().removeClass('active');
        let type = $(this).attr('data-type');
        console.log(type);
        switch (type) {
            case '1':
                url= '/post/dosort1';
                dosort(plateId,url);
                break;
            case '2':
                url= '/post/dosort2';
                dosort(plateId,url);
                break;
        }
    });

    //切换板块
   /* $('#toplate').on('click','li',function () {
        $(this).addClass('active').siblings().removeClass('active');
        plateId = $(this).attr('data-plate');
        doplate(plateId);
        dosort(plateId,url);
    });*/

   //搜帖
    $('#btn_search').on('click',function () {
        let postTitle = $('#likeTitle').val();
        dosearch(plateId,postTitle);
    });

    // 选择图片
    let postPhoto = document.getElementById('postPhoto');
    postPhoto.addEventListener('change', function() {
        let t_files = this.files;
        console.log(t_files);
        for (let i = 0, len = t_files.length; i < len; i++) {
            let objFile = t_files[i].name;
            let objSize = t_files[i].size;
            console.log($(this)[0].files[0]);
            let objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
            if (!(objType === '.jpg' || objType === '.png')) {
                alert("请上传jpg、png类型图片");
                delete t_files[i];
                return false;
            } else if(objSize>1024*1024*3){
                alert("上传的图片过大，请在3M以内。");
                delete t_files[i];
                return false;
            }
        }
    }, false);



   // 发帖
    $('#up_post').on('click',function () {
        let postTitle = $('#postTitle').val();
        let postContent = $('#postContent').val();
        if (!postTitle) {
            alert('标题不可为空');
            return ;
        }
        if (!postContent) {
            alert('内容不可为空');
            return ;
        }
        $('#plateId').val(plateId);
        $('#userName').val(userName);

        let formData = new FormData(document.forms.namedItem("addForm"));  //获取表单内容
        console.log(formData);

        uppost(formData);
    });

    // 跳转帖子详情页面
    $('#forlist').on('click','li',function () {
        let postId = $(this).attr('data-id');
        window.location.href = `/post/plate/${plateId}/${postId}`;
    });


};

/**
 * 板块信息
 * @param plateId
 */
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

                userName = result.user.userName;
                $('#foruser').text(userName);
                $('#tohome').attr('href',`/post/home/${userName}`);
            }
        }
    });
}

/**
 * 帖子排序
 * @param plateId
 * @param url
 */
function dosort(plateId,url) {
    $.ajax({
        url: url,
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
                let list = result.list;
                let tem2 = $('#tem-list').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem2,v);
                    $('#forlist').append(out);

                    // 图片摁进去
                    if (v.postPhoto) {
                        v.postPhoto =  v.postPhoto.split(',');
                       v.postPhoto.pop();
                        let imgs = v.postPhoto;
                        console.log(imgs);
                        let html='',key = k;
                        $.each(imgs,function (k,v) {
                            html += `<img src="/image/postPhoto/${v}" />`;
                            console.log(html);
                             $(`#forlist li:eq(${key}) .z-post-imgs`).html(html);
                        });
                    }
                });

                // 分页
                $('.pagination-container').remove();
                $('#forlist').paginathing({
                    perPage: 10, //每页几个
                    insertAfter: '#forlist',
                    pageNumbers: true
                });

            }
        }
    });
}

/**
 * 搜索帖子
 * @param plateId
 * @param postTitle
 */
function dosearch(plateId,postTitle) {
    $.ajax({
        url: '/post/dosearch',
        type: 'post',
        data:JSON.stringify({
            'plateId':plateId,
            'postTitle':postTitle
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                $('#forlist').html('');
                let list = result.list;
                if (list.length === 0){
                    $('#forlist').html(`<span class="center-block text-danger">暂无搜索结果！</span>`);
                    return;
                }
                let tem2 = $('#tem-list').html();
                $.each(list,function (k,v) {
                    let out = Mustache.render(tem2,v);
                    $('#forlist').append(out);

                    // 图片摁进去
                    if (v.postPhoto) {
                        v.postPhoto =  v.postPhoto.split(',');
                        v.postPhoto.pop();
                        let imgs = v.postPhoto;
                        console.log(imgs);
                        let html='',key = k;
                        $.each(imgs,function (k,v) {
                            html += `<img src="/image/postPhoto/${v}" />`;
                            console.log(html);
                            $(`#forlist li:eq(${key}) .z-post-imgs`).html(html);
                        });
                    }
                });

                // 分页
                $('.pagination-container').remove();
                $('#forlist').paginathing({
                    perPage: 10, //每页几个
                    insertAfter: '#forlist',
                    pageNumbers: true
                });
            }
        }
    });
}

/**
 * 发帖
 * @param formData
 */
function uppost(formData) {
    $.ajax({
        type:'POST',
        url:'/post/uppost',
        data:formData,
        dataType:'json',
        processData: false,  // 告诉JSLite不要去处理发送的数据
        contentType: false,   // 告诉JSLite不要去设置Content-Type请求头
        success:function(result){
            dosort(plateId,url);
            $('input,textarea').val('');
            console.log(result);
            if (result.code===0){
                alert(result.text);
            } else {
                dosort(plateId,url);
                $('input,textarea').val('');
            }
        },
        error:function(err){
            console.log('error:',err)
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
