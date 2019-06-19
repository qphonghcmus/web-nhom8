require('./models/db');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const auth = require('./middlewares/auth');
const auth_writer = require('./middlewares/auth_writer');
const auth_editor = require('./middlewares/auth_editor');
const auth_admin = require('./middlewares/auth_admin');
const auth_myprofile = require('./middlewares/auth_profile');
var passport = require('passport');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/passport_facebook')(app);
require('./middlewares/upload')(app);
app.use(require('./middlewares/auth-locals.mdw'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use('/', require('./routes/TrangChu/index'));
app.use('/login', require('./routes/TrangDangNhap/route.login'));
app.get('/login/fb', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/login/fb/cb',
    passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));

app.use('/register', require('./routes/TrangDangNhap/route.register'));
app.use('/forget-password', require('./routes/TrangDangNhap/route.forgetpassword'));
app.use('/list', require('./routes/DanhSachBaiViet/route.dsbaiviet'));
app.use('/administrator', auth_admin, require('./routes/Admin/route.admin'));
app.use('/my-information', auth_myprofile, require('./routes/TrangDangNhap/route.subscriberInformation'));
app.use('/logout', auth, require('./routes/TrangDangNhap/route.logout'));
app.use('/public/vendors', express.static(__dirname + '/public//vendors'));
app.use('/public/resource', express.static(__dirname + '/public//resource'));
app.use('/editor', auth_editor, require('./routes/editor/route.editor'));
app.use('/writer', auth_writer, require('./routes/writer/route.writer'));

app.listen(3000, () => "Web server is running");

module.exports = app;