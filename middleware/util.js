let Util = {};

Util.math = {
    //取 (n,m] 随机数
    random: function(n,m){
        return Math.floor(Math.random()*(m-n+1))+n;
    },
};

/*
Util.check = {
    //检查是否为空
    isFalse: function(str){
        return !!str;
    },
    //检查是否为邮箱号
    isMail: function (str) {
        let reg =  /^(\w)+([-.]\w+)*@(\w)+((\.\w{2,4}){1,3})$/;
        return !!reg.test(str);
    },
    //检查是否包含特殊字符
    isString: function(str){
        let reg = /^[\u4e00-\u9fa5a-z]+$/gi;
        return !!reg.test(str);
    },
};
*/

Util.currentTime = function () {
    let now = new Date();
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        hh = now.getHours(),
        mm = now.getMinutes(),
        ss = now.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
};




module.exports = Util;
