var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const moment = require('moment');
router.get('/',(req,res,next)=>{
  var page = req.query.page || 1;
  if (page < 1) page=1;
  var limit = 5;
  var offset = (page-1)*limit;
    var   current =parseInt(page);
  
  var findPost = Post.find({tenChuyenMuc:'Công nghệ'}).skip(offset).sort({'ngayDang':-1}).limit(6);
  var countPost = Post.count({tenChuyenMuc:'Công nghệ'});

  Promise.all([
     countPost,findPost
  ]).then(([count,docs])=>{
    var total = count;
    var nPages = Math.floor(total/limit);
    if (total % limit > 0) nPages++;
    var pages = [];
    for (i = 1; i <= nPages; i++) {
      var obj = { value: i, active: i === +page };
      pages.push(obj);
    }
    res.render('./DanhSachBaiViet/CongNghe',{list:docs, moment:moment,pages:pages,current:current});
  }).catch(err =>{
    res.json('Eror ' +err);
  });
});

  

module.exports = router;