/*
 * 作者：张慧珍
 * 创建时间：2019-04-02
 * 版本：[1.0,2019-04-02]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";


window.onload = function () {
    $.ajax({
        url: '/doindex',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            if (result.code !== '200'){
                return;
            }
            let list = result.data;
            let tem = $('#template').html();
            console.log(list);
            $.each(list,function (k,v) {
                let out = Mustache.render(tem,v);
                $('#plates').append(out);
            });
        }
    });
};


$('#plates').on('click','.thumbnail',function () {
    let plateid = $(this).attr('id');
    // $.ajax({
    //     url: `/post/doplate`,
    //     type: 'get',
    //     data:JSON.stringify({
    //         'plateid':plateid
    //     }),
    //     dataType: 'json',
    //     contentType: 'application/json;charset=UTF-8',
    //     success:function (result) {
    //         console.log(result);
    //         if (result.code === 0){
    //             alert(result.text);
    //         } else {
    //             window.location.href=`/post/plate/${plateid}`;
    //         }
    //     }
    // });
     window.location.href = `/post/plate/${plateid}`;
});
