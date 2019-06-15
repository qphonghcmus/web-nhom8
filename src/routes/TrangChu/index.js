var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
const moment = require('moment');

router.get('/', (req,res)=>{
  var p1 = postModel.top10latestnews();
  var p2 = postModel.top10mostviewsnews();
  var p3 = postModel.top1newsof10cat();
  var p4 = postModel.top4mostviewsnews();

  Promise.all([p1,p2,p3,p4]).then(value=>{
    var daydiff = []
    value[3].forEach(e => {
      daydiff.push(moment(new Date()).diff(moment(e.ngayDang),"days"));
    });
    res.render('./TrangChu/index',{
      list: value[0],
      mostviews: value[1],
      top10of10: value[2],
      top4viewsnews: value[3],
      daydiff: daydiff,
      moment: moment
    })
  })
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
