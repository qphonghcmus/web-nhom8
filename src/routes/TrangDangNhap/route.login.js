var express = require('express');
var router = express.Router();
var passport = require('passport');
const userModel = require('../../models/user.model');

router.get('/', (req, res) => {
    res.render('./TrangDangNhap/login',{
        err_message: null
    });
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
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

            return res.redirect('/');
        });
    })(req, res, next);
});


module.exports = router;