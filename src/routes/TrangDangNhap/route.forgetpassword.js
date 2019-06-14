var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../../models/user.model');
const randomstring = require('randomstring');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var secrettoken = null;
var email_temp=null;

router.get('/confirm', (req, res, next) => {
    res.render('./TrangDangNhap/confirmOTP', {
        mail: email_temp
    });
})

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
        res.redirect('/forget-password/confirm');
    }
})

router.get('/is-unavailable', (req, res, next) => {
    var Email = req.query.username;
    userModel.singleByEmail(Email)
        .then(rows => {
            if (rows.length > 0) {
                return res.json(true)
            }
            else
                return res.json(false);
        })
})

router.get('/', (req, res) => {
    res.render('./TrangDangNhap/forgetpassword');
})

router.post('/', (req, res) => {
    email_temp=req.body.username;
    secrettoken = randomstring.generate({
        length: 6,
        charset: 'alphanumeric'
    });
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    userModel.updateSecretToken_Password(email_temp, secrettoken, hash)
        .then(rows => {
        })
        .catch(err => {
            res.json(err + '');
        });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'web8teamhcmus@gmail.com',
            pass: 'laptrinhweb88@'
        }
    });

    var mailOptions = {
        from: 'Web8Team@gmail.com',
        to: req.body.username,
        subject: 'Mã xác nhận',
        text: secrettoken
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            next(error);
        } else {
            res.redirect('/forget-password/confirm');
        }
    })
});

module.exports = router;