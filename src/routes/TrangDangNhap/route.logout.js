var express = require('express');
var router = express.Router();
const auth = require('../../middlewares/auth');

router.post('/', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;