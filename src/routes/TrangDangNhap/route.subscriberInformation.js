var express = require('express');
var router = express.Router();
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
var change_password = false;


router.get('/password_correct', (req, res, next) => {
    var pass = req.query.password_present;
    var ret = bcrypt.compareSync(pass, req.user.passWord);
    if (ret) {
        change_password = true;
        return res.json(true);
    }
    else
        return res.json(false);
});

router.get('/', auth, (req, res, next) => {
    res.render('./TrangDangNhap/myInformation', {
        user: req.user,
        moment: moment
    });
});

router.post('/', (req, res, next) => {
    var hash = null;
    if (change_password) {
        var saltRounds = 10;
        hash = bcrypt.hashSync(req.body.password_new, saltRounds);
    }
    else {
        hash = req.user.passWord;
    }
    var dob = moment(req.body.birthDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        hoTen: req.body.fullname,
        email: req.user.email,
        passWord: hash,
        ngaySinh: dob,
        phoneNumber: req.body.sdt,
        permission: 0
    }

    userModel.updateProfile(entity, req.user.email)
        .then(id => {
            req.logOut();
            res.redirect('/login');
        })
        .catch(e => res.json(e + ''));
})
module.exports = router;