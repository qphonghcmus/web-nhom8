require('./models/db');
var express = require('express');
var path = require('path');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth-locals.mdw'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use('/', require('./routes/TrangChu/index'));
app.use('/login',require('./routes/TrangDangNhap/route.login'));
app.use('/register',require('./routes/TrangDangNhap/route.register'));
app.use('/list',require('./routes/DanhSachBaiViet/route.dsbaiviet'));
app.use('/administrator',require('./routes/Admin/route.admin'));
app.use('/my-information',require('./routes/TrangDangNhap/route.subscriberInformation'));

app.use('/public/vendors',express.static(__dirname + '/public//vendors'));
app.use('/public/resource',express.static(__dirname + '/public//resource'));
app.use('/editor',require('./routes/editor/route.editor'));
app.use('/writer',require('./routes/writer/route.writer'));

app.listen(3000, ()=> "Web server is running");

module.exports = app;