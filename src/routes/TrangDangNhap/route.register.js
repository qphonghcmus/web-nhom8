var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const randomstring = require('randomstring');
var nodemailer = require('nodemailer');

var email_temp = null;
var secrettoken = null;

router.get('/confirm', (req, res, next) => {
    res.render('./TrangDangNhap/confirmOTP', {
        mail: email_temp
    });
})

router.get('/', (req, res, next) => {
    res.render('./TrangDangNhap/register');
});



router.post('/confirm', (req, res, next) => {
    if (req.body.code == secrettoken) {
        userModel.turncomfirmded(email_temp)
            .then(rows => {
                res.redirect('/login');
            })
            .catch(err => {
                res.json(err + '');
            })
    }
    else {
        res.redirect('/register/confirm');
    }
})

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


router.post('/', (req, res, next) => {
    secrettoken = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
    });

    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var dob = moment(req.body.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');
    email_temp = req.body.username;
    var entity = {
        hoTen: req.body.fullname,
        email: req.body.username,
        passWord: hash,
        secretToken: secrettoken,
        ngaySinh: dob,
        phoneNumber: req.body.sdt,
        permission: 0
    }

    userModel.add(entity)
        .then(id => {
        })
        .catch(e => res.json(e + ''));

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'web8teamhcmus@gmail.com',
            pass: 'laptrinhweb88@'
        }
    });

    var mailOptions = {
        from: 'Web8Team@gmail.com',
        to: email_temp,
        subject: 'Mã xác nhận',
        text: secrettoken
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            next(error);
        } else {
            res.redirect('/register/confirm');
        }
    })
});


module.exports = router;