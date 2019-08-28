/*
 * 作者：FeiYang
 * 创建时间: 2019-04-03
 * 版本: [1.0,2019-04-03]
 * 版权: @肥羊不绵
 * 描述:
 * */


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

