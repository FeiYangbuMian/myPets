const nodemailer  = require('nodemailer');
const config = require('./config');
let mail = nodemailer.createTransport({
    host: 'smtp.qq.com',
    service: 'qq',
    secure: true,
    auth:{
        user:config.email.account,
        pass:config.email.password
    }
});

/*
let options = {
    from:'1136260155@qq.com',
    to:'320801223@qq.com',
    subject:'一封用于测试的邮件',
    html:'<h1>这是一封用于测试的邮件！<br /><p>您的验证码是</p></h1>'
};

mailTransport.sendMail(options,function (err,msg) {
    if (err){
        console.log(err);
    } else {
        console.log(msg);
    }
});
*/

module.exports = mail;
