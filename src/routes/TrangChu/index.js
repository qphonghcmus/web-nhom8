var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./TrangChu/index');
});
router.post('/them-bai-viet',(req,res,next)=>{
  themBaiViet(req,res);
});

function themBaiViet(req,res)
{
  var post = new Post();
  post.tieuDe = req.body.tieuDe;
  post.tenChuyenMuc = req.body.tenChuyenMuc;
  post.imagePath = req.body.imagePath;
  post.tag = req.body.tag;
  post.noiDungTomTat = req.body.noiDungTomTat;
  post.viewNumber = 0;
  post.save((err,doc)=>{
    if (!err)
    {
      res.json('successfully');
    }
    else
    {
      res.json('error');
    }
  });
}
module.exports = router;
