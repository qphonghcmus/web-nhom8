var express = require('express');
var router = express.Router();
var passport = require('passport'); // dùng để login
const userModel = require('../../models/user.model');
const auth = require('../../middlewares/auth_login');

router.get('/', auth, (req, res, next) => {
    res.render('./TrangDangNhap/login', {
        err_message: null
    });
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // sd passport local
        if (err)
            return next(err);

        if (!user) {
            return res.render('./TrangDangNhap/login', {
                err_message: info.message
            })
        }

        req.logIn(user, err => {
            if (err)
                return next(err);
            else {
                if (user.permission == 0)
                    return res.redirect('/'); // login thành công với người dùng bình thường
                else if (user.permission == 1)
                    return res.redirect('/writer'); // login thành công với writer
                else if (user.permission == 2)
                    return res.redirect('/editor'); // login thành công với editor
                else if (user.permission == 3)
                    return res.redirect('/administrator'); // login thành công với admin
            }

        });
    })(req, res, next);
});


module.exports = router;