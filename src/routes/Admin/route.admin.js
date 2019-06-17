var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
const auth = require('../../middlewares/auth_login');
var listCategory = ['Công nghệ', 'Thể thao', 'Giải trí'];
var userModel = require('../../models/user.model');
var bcrypt = require('bcrypt'); // dùng để hash password
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý chuyên mục',
    filename: '../../Admin/ManageCategory',
    activeManageCategory: true,
    cssfiles: ['ManageCategory'],
    jsfiles: ['ManageCategory'],
    listCategory: listCategory,
  });
});
router.post('/manage-category/:i', (req, res) => {

  var searchStr = {};
  var i = req.params.i;
  if (req.body['search[value]']) {
    var regex = new RegExp(req.body['search[value]'], 'i');
    searchStr = { $or: [{ idBaiViet: req.body['search[value]'] }, { tieuDe: req.body['search[value]'] }] };
    console.log(searchStr);
  }
  else {
    searchStr = {};
  }
  var recordsTotal = 0;
  var recordsFiltered = 0;

  Promise.all([
    postModel.countByChuyeMuc(listCategory[i]),
    postModel.countBySearchString(searchStr, listCategory[i]),
    postModel.findBySearchString(searchStr, listCategory[i], req.body.start, req.body.length)
  ]).then(([c, d, docs]) => {
    recordsTotal = c;
    console.log(c);
    recordsFiltered = d;
    console.log(d);
    console.log(req.body.start);
    console.log(req.body.length);
    var data = JSON.stringify({
      "draw": req.body.draw,
      "recordsFiltered": recordsFiltered,
      "recordsTotal": recordsTotal,
      "data": docs
    });
    console.log(data);
    res.send(data);
  }).catch(err => res.json(err));

})

router.get('/manage-category', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý chuyên mục',
    filename: '../../Admin/ManageCategory',
    activeManageCategory: true,
    cssfiles: ['ManageCategory'],
    jsfiles: ['ManageCategory'],
  });
});

router.get('/manage-post', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý bài viết',
    filename: '../../Admin/ManagePost',
    activeManagePost: true,
    cssfiles: ['ManagePosts'],
    jsfiles: ['ManagePosts'],
  });
});

router.get('/manage-tag', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý nhãn',
    filename: '../../Admin/ManageTag',
    activeManageTag: true,
    cssfiles: ['ManageTag'],
    jsfiles: ['ManageTag'],
  });
});

router.get('/manage-subscriber', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý độc giả',
    filename: '../../Admin/ManageSubscriber',
    activeManageUser: true,
    activeManageSubscriber: true,
    cssfiles: ['ManageSubscriber'],
    jsfiles: ['ManageSubscriber'],
  });
});

router.get('/manage-editor', function (req, res, next) {
  userModel.DisplayListEditor()
    .then(docs => {
      res.render('./layouts/Admin/admin.ejs', {
        title: 'Quản lý biên tập viên',
        filename: '../../Admin/ManageEditor',
        activeManageUser: true,
        activeManageEditor: true,
        cssfiles: ['ManageEditor'],
        jsfiles: ['ManageEditor'],
        list: docs
      });
    })
    .catch(err => {
      res.json(err + '');
    })

});

router.post('/manage-editor', function (req, res, next) {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds); // hash password
  var entity = {
    hoTen: req.body.fullname,
    email: req.body.username,
    passWord: hash,
    phoneNumber: req.body.sdt,
    confirmed: true,
    category: req.body.category,
    permission: 2
  } // tạo object thêm vào user trong db
  userModel.add(entity)
    .then(id => { res.redirect('/administrator/manage-editor') })
    .catch(e => res.json(e + ''));
});

router.get('/manage-editor/delete/:id', (req, res) => {
  userModel.DeleteUser(req.params.id)
    .then(rows => {
      res.redirect('/administrator/manage-editor');
    })
    .catch(err => {
      res.json(err + '');
    })
})

router.get('/manage-writer', function (req, res, next) {
  userModel.DisplayListWriter()
    .then(docs => {
      res.render('./layouts/Admin/admin.ejs', {
        title: 'Quản lý phóng viên',
        filename: '../../Admin/ManageWriter',
        activeManageUser: true,
        activeManageWriter: true,
        cssfiles: ['ManageWriter'],
        jsfiles: ['ManageWriter'],
        list: docs
      });
    })
    .catch(err => {
      res.json(err + '');
    })

});

router.post('/manage-writer', function (req, res, next) {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds); // hash password
  var entity = {
    hoTen: req.body.fullname,
    email: req.body.username,
    passWord: hash,
    penName: '',
    phoneNumber: req.body.sdt,
    confirmed: true,
    permission: 1
  } // tạo object thêm vào user trong db

  userModel.add(entity)
    .then(id => { res.redirect('/administrator/manage-writer') })
    .catch(e => res.json(e + ''));
});

router.get('/manage-writer/delete/:id', (req, res) => {
  userModel.DeleteUser(req.params.id)
    .then(rows => {
      res.redirect('/administrator/manage-writer');
    })
    .catch(err => {
      res.json(err + '');
    })
})

module.exports = router;