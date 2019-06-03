var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('./TrangDangNhap/register');
});
router.post('/confirmOTP',(req,res)=>{
    res.render('./TrangDangNhap/confirmOTP');
});
module.exports = router;