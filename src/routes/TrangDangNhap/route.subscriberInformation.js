var express = require('express');
var router = express.Router();
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
var moment = require('moment');
var multer = require('multer');// upload file
var bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
var change_password = false; // TH không thay pass

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/resource/img/avatar');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

router.get('/password_correct', (req, res, next) => { //xử lí remote nhập pass cũ đúng chưa
    var pass = req.query.password_present;
    var ret = bcrypt.compareSync(pass, req.user.passWord);
    if (ret) {
        change_password = true; // TH thay pass
        return res.json(true);
    }
    else
        return res.json(false);
});

router.get('/', auth, (req, res, next) => {
    res.render('./TrangDangNhap/myInformation', {
        user: req.user, // truyền thông tin user qua ejs
        moment: moment
    });
});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file);
    // var hash = null;
    // if (change_password) { // TH thay pass cần hash
    //     var saltRounds = 10;
    //     hash = bcrypt.hashSync(req.body.password_new, saltRounds);
    // }
    // else {
    //     hash = req.user.passWord; // Ko thay pass thì lấy pass cũ tạo entity
    // }
    // var dob = moment(req.body.birthDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    // var entity = {
    //     hoTen: req.body.fullname,
    //     email: req.user.email,
    //     passWord: hash,
    //     ngaySinh: dob,
    //     phoneNumber: req.body.sdt,
    //     permission: 0
    // }

    // userModel.updateProfile(entity, req.user.email)
    //     .then(id => {
    //         req.logOut();
    //         res.redirect('/login');
    //     })
    //     .catch(e => res.json(e + ''));
})
module.exports = router;