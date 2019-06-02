var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
const moment = require('moment');

router.get('/', (req,res)=>{
  postModel.top10latestnews()
  .then((docs)=>{
    res.render('./TrangChu/index',{
      list:docs,
      moment: moment
    })
  })
  .catch(e=>res.json(e));
})

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
