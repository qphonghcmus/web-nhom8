var express = require('express');
var router = express.Router();
const auth = require('../../middlewares/auth');
const moment = require('moment');
var bcrypt = require('bcrypt');


router.get('/', auth, (req, res, next) => {
    
    res.render('./TrangDangNhap/myInformation', {
        user: req.user,
        moment: moment
    });
});

module.exports = router;