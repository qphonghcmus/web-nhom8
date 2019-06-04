var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');

router.get('/is-available', (req, res, next) => {
    var Email = req.query.username;
    userModel.singleByEmail(Email)
        .then(rows => {
            if (rows.length > 0) {
                return res.json(false)
            }
            else
                return res.json(true);
        })
});

router.get('/', (req, res, next) => {
    res.render('./TrangDangNhap/register');
});

router.post('/', (req, res, next) => {
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        hoTen: req.body.fullname,
        email: req.body.username,
        passWord: hash,
        ngaySinh: dob,
        phoneNumber: req.body.sdt,
        permission: 0
    }

    userModel.add(entity)
        .then(id => {
            res.redirect('/login');
        })
        .catch(e => res.json(e + ''));

});
module.exports = router;