var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý chuyên mục',
    filename: '../../Admin/ManageCategory',
    activeManageCategory: true,
    cssfiles: ['ManageCategory'],
    jsfiles: ['ManageCategory'],
  });
});

router.get('/manage-category', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý chuyên mục',
    filename: '../../Admin/ManageCategory',
    activeManageCategory: true,
    cssfiles: ['ManageCategory'],
    jsfiles: ['ManageCategory'],
  });
});

router.get('/manage-post', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý bài viết',
    filename: '../../Admin/ManagePost',
    activeManagePost: true,
    cssfiles: ['ManagePosts'],
    jsfiles: ['ManagePosts'],
  });
});

router.get('/manage-tag', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý nhãn',
    filename: '../../Admin/ManageTag',
    activeManageTag: true,
    cssfiles: ['ManageTag'],
    jsfiles: ['ManageTag'],
  });
});

router.get('/manage-subscriber', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý độc giả',
    filename: '../../Admin/ManageSubscriber',
    activeManageUser: true,
    activeManageSubscriber:true,
    cssfiles: ['ManageSubscriber'],
    jsfiles: ['ManageSubscriber'],
  });
});

router.get('/manage-editor', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý biên tập viên',
    filename: '../../Admin/ManageEditor',
    activeManageUser: true,
    activeManageEditor:true,
    cssfiles: ['ManageEditor'],
    jsfiles: ['ManageEditor'],
  });
});

router.get('/manage-writer', function(req, res, next) {
  res.render('./layouts/Admin/admin.ejs',{
    title: 'Quản lý phóng viên',
    filename: '../../Admin/ManageWriter',
    activeManageUser: true,
    activeManageWriter:true,
    cssfiles: ['ManageWriter'],
    jsfiles: ['ManageWriter'],
  });
});

module.exports = router;