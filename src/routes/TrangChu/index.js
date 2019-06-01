var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./TrangChu/index');
});
router.post('/them-bai-viet',(req,res,next)=>{
  themBaiViet(req,res);
});

function themBaiViet(req,res)
{
  console.log(req.body);
  var post = {
    tieuDe : req.body.tieuDe,
    tenChuyenMuc : req.body.tenChuyenMuc,
    imagePath : req.body.imagePath,
    tag : req.body.tag,
    noiDungTomTat : req.body.noiDungTomTat,
    viewNumber : 0,
  }
  postModel.add(post).then(res.json('successfully')).catch(res.json('error'));
  
}
module.exports = router;
