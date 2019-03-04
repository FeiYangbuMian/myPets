const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');//一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
const logger = require('morgan'); //在控制台中，显示req请求的信息
//const  bobyParser = require('body-parser');
const  moment = require('moment');

const app = express();

app.locals.moment = moment;

/*var indexRouter = require('./routes/client');
var usersRouter = require('./routes/users');*/

// 路由信息（接口地址），存放在routes的根目录
const routes = require('./routes/client');
const users = require('./routes/users');


// 设置模板目录
app.set('views', path.join(__dirname, 'views')); //设置存放模板文件的目录
//app.set('view engine', 'ejs');// 设置模板引擎为 ejs
app.engine('html',require('ejs').__express);
app.set('view engine', 'html'); // 将项目改为运行html后缀

//载入中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));


//配置路由('自定义路径'，上面设置的接口地址)
app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users); // 即为为路径 /users 设置路由
/*app.use('/login',routes); // 即为为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use("/logout",routes); // 即为为路径 /logout 设置路由*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
