/*
 * 作者：张慧珍
 * 创建时间：2019-03-02
 * 版本：[1.0,2019-04-11]
 * 版权：@肥羊不绵
 * 描述：
 * */
"use strict";

let userName = document.getElementById('userName'),
    userBrith = document.getElementById('userBrith'),
    userEmail = document.getElementById('userEmail'),
    province = '',city = '',email='',data={};

let reg = new RegExp("(^|&)userEmail=([^&]*)(&|$)", "i");
let r = window.location.search.substr(1).match(reg);
if (r != null) email = unescape(r[2]);
userEmail.value = email;
console.log(email);


let allValue = function (){
    province = $('#province option:selected').val();
    city = $('#city option:selected').val();
    console.log('222');
    if (userName.value && userBrith.value && province && city) {
        btn_next.removeAttribute('disabled');
    } else {
        btn_next.setAttribute('disabled','disabled');
    }
};

$('body').on('input','input',function () {
    allValue();
}).on('change','select,input',function () {
    allValue();
}).on('change','#userPhoto',function () {
    let objFile = $(this).val();
    let objSize = $(this)[0].files[0].size;
    console.log($(this)[0].files[0]);
    let objType = objFile.substring(objFile.lastIndexOf(".")).toLowerCase();
    let formData = new FormData(document.forms.namedItem("picForm"));
    console.log(objFile);
    if(!(objType === '.jpg'||objType === '.png')){
        alert("请上传jpg、png类型图片");
        return false;
    }else{
        $.ajax({
            type : 'post',
            url : '/client/dophoto',
            data: formData ,
            processData:false,
            async:false,
            cache: false,
            contentType: false,
            success:function(result){
                console.log(result);
                if (result.code === 0) {
                    alert(result.text);
                } else {
                    $('#photo').attr('src',`../../image/userPhoto/${result.data}`);
                }
            },
            error:function(err){
                console.log(err);
            }
        });
    }
}).on('input','#userName',function () {
    let _this = $(this);
    $.ajax({
        url: '/client/ifname',
        type: 'post',
        data: JSON.stringify({
            userName:userName.value
        }),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            $('#text_danger').text(result.text);
            if (result.code === 0){
                _this.addClass('z-input-danger');
            } else {
                _this.removeClass('z-input-danger');
            }
        }
    });
}).on('click','#btn_next',function () {
    data.userarea = province+city;
    data.userName = userName.value;
    data.userBrith = userBrith.value;
    data.userEmail = userEmail.value;
    console.log(data);
    $.ajax({
        url: '/client/doregister1',
        type: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success:function (result) {
            console.log(result);
            if (result.code === 0){
                alert(result.text);
            } else {
                alert('请登录');
                //window.location.href=`/client/login`;
            }
        }
    });
});
