var express = require('express');
var path = require('path');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));


app.use('/', require('./routes/TrangChu/index'));
app.use('/administrator/',require('./routes/TrangAdmin/admin'));


app.listen(3000, ()=> "Web server is running");

module.exports = app;
