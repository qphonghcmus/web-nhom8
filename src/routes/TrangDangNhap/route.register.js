var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var moment = require('moment'); // format date
var bcrypt = require('bcrypt'); // dùng để hash password
const userModel = require('../../models/user.model');
const randomstring = require('randomstring');
var nodemailer = require('nodemailer'); // gửi mail xác nhận
var email_temp = null; // biến dùng để truyền vào ejs confirm
var secrettoken = null; // dùng để so sánh mã xác nhận

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
        userModel.turnoncomfirmded(email_temp) // nhập đúng mã thì bật confirm true
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

router.get('/is-available', (req, res, next) => { // kt email từng đăng ký chưa
    var Email = req.query.username;
    userModel.singleByEmail(Email) // kt từng db
        .then(rows => {
            if (rows.length > 0 && rows[0].confirmed) { // xét nếu mail đã có trong db và mail đã confirm thì ko đc đăng ký
                return res.json(false)
            }
            else
                return res.json(true);
        })
});


router.post('/', (req, res, next) => {
    secrettoken = randomstring.generate({ // mã xác nhận 
        length: 6,
        charset: 'alphanumeric' // cả chữ và số
    });
    var endDate = new Date();
    var startDate = new Date();
    var numberOfDaysToAdd = 7;
    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
    console.log(endDate.getDate());
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds); // hash password
    var dob = moment(req.body.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'); // format date
    email_temp = req.body.username;
    var entity = {
        hoTen: req.body.fullname,
        email: req.body.username,
        passWord: hash,
        secretToken: secrettoken,
        ngaySinh: dob,
        NgayDK: startDate,
        NgayHetHan: endDate,
        phoneNumber: req.body.sdt,
        permission: 0
    } // tạo object thêm vào user trong db
    
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
    transporter.sendMail(mailOptions, function (error, info) { // gửi mail
        if (error) {
            next(error);
        } else {

            res.redirect('/register/confirm');
        }
    })
});


module.exports = router;