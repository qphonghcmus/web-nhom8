var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
var categoryModel = require('../../models/category.model');
const auth = require('../../middlewares/auth_login');
var listCategory;
var userModel = require('../../models/user.model');
var bcrypt = require('bcrypt'); // dùng để hash password
var change_password = false; // TH không đổi mật khẩu 
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  categoryModel.load().then(docs => {
    listCategory = docs;
    res.render('./layouts/Admin/admin.ejs', {
      title: 'Quản lý chuyên mục',
      filename: '../../Admin/ManageCategory',
      activeManageCategory: true,
      cssfiles: ['ManageCategory'],
      jsfiles: ['ManageCategory'],
      listCategory: listCategory
    });
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
    recordsFiltered = d;
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
  categoryModel.load().then(docs => {
    listCategory = docs;
    res.render('./layouts/Admin/admin.ejs', {
      title: 'Quản lý chuyên mục',
      filename: '../../Admin/ManageCategory',
      activeManageCategory: true,
      cssfiles: ['ManageCategory'],
      jsfiles: ['ManageCategory'],
      listCategory: listCategory
    });
  });
});
router.post('/', function (req, res, next) {
  var chuyenMucCon = new Array(req.body.chuyenMucCon1, req.body.chuyenMucCon2);
  var entity = {
    tenChuyenMuc: req.body.tenChuyenMuc,
    chuyenMucCon: chuyenMucCon
  };
  categoryModel.addWithSubCategory(entity).then(docs => {
    res.redirect('/administrator/manage-category');
  })
    .catch(err => {
      //res.json(err + '');
      res.json(entity);
    })
});
router.post('/manage-category', function (req, res, next) {
  var chuyenMucCon = new Array(req.body.chuyenMucCon1, req.body.chuyenMucCon2);
  var entity = {
    tenChuyenMuc: req.body.tenChuyenMuc,
    chuyenMucCon: chuyenMucCon
  };
  categoryModel.addWithSubCategory(entity).then(docs => {
    res.redirect('/manage-category');
  })
    .catch(err => {
      //res.json(err + '');
      res.json(entity);
    })
});


router.get('/manage-post-published', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý bài viết',
    filename: '../../Admin/ManagePostPublished',
    activeManagePostPublished: true,
    cssfiles: ['ManagePostPublished'],
    jsfiles: ['ManagePostPublished'],
    listCategory: listCategory,
  });
});

router.get('/manage-post-draff', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Quản lý bài viết',
    filename: '../../Admin/ManagePostDraff',
    activeManagePostDraff: true,
    cssfiles: ['ManagePostDraff'],
    jsfiles: ['ManagePostDraff'],
    listCategory: listCategory,
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

router.get('/my-information', function (req, res, next) {
  res.render('./layouts/Admin/admin.ejs', {
    title: 'Thông tin cá nhân',
    filename: '../../Admin/ManageMyInformation',
    activeManageMyInformation: true,
    cssfiles: ['ManageMyInformation'],
    jsfiles: ['ManageMyInformation'],
  });
});

router.post('/my-information', function (req, res, next) {
  var hash = null;
  if (change_password) { // TH thay pass cần hash
    var saltRounds = 10;
    hash = bcrypt.hashSync(req.body.password_new, saltRounds);
  }
  else {
    hash = req.user.passWord; // Ko thay pass thì lấy pass cũ tạo entity
  }
  var entity = {
    hoTen: req.body.fullname,
    email: req.user.email,
    passWord: hash,
    phoneNumber: req.body.sdt,
    permission: 3,
  }
  userModel.updateProfile(entity, req.body.email)
    .then(docs => {
      req.logOut();
      res.redirect('/login');
    })
    .catch(err => {
      res.json(err + '');
    })
});

router.get('/my-information/password_correct', (req, res, next) => { //xử lí remote nhập pass cũ đúng chưa
  var pass = req.query.password_present;
  var ret = bcrypt.compareSync(pass, req.user.passWord);
  if (ret) {
    change_password = true; // TH thay pass
    return res.json(true);
  }
  else
    return res.json(false);
});
router.get('/manage-subscriber', function (req, res, next) {
  var list1 = null;
  userModel.DisplayListSubcriber()
    .then(docs => {
      userModel.DisplayListSubcriberWaitAccept()
        .then(rows => {
          res.render('./layouts/Admin/admin.ejs', {
            title: 'Quản lý độc giả',
            filename: '../../Admin/ManageSubscriber',
            activeManageUser: true,
            activeManageSubscriber: true,
            cssfiles: ['ManageSubscriber'],
            jsfiles: ['ManageSubscriber'],
            list: rows,
            list_premium: docs,
            moment: moment
          });
        })
    })
});

router.get('/manage-subscriber/accept/:id', (req, res) => {
  userModel.AcceptPremium(req.params.id)
    .then(docs => {
      res.redirect('/administrator/manage-subscriber');
    })
    .catch(err => {
      res.json(err + '');
    })
})

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
    ngaySinh: '',
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
    ngaySinh: '',
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