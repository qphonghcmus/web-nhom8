var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
const moment = require('moment');

router.get('/', (req, res) => {
  var p1 = postModel.top10latestnews();
  var p2 = postModel.top10mostviewsnews();
  var p3 = postModel.top1newsof10cat();
  var p4 = postModel.top4mostviewsnews(10);

  Promise.all([p1, p2, p3, p4]).then(value => {

    var daydiff = []
    value[3].forEach(e => {
      daydiff.push(moment(new Date()).diff(moment(e.ngayDang), "days"));
    });
    res.render('./TrangChu/index', {
      list: value[0],
      mostviews: value[1],
      top10of10: value[2],
      top4viewsnews: value[3],
      daydiff: daydiff,
      moment: moment
    })
  })
})

router.get('/text-search/', (req, res, next) => {
  var searchString = req.query.topSearch;
  var page = req.query.page || 1;

  if (page < 1) page = 1;
  var limit = 5;
  var offset = (page - 1) * limit;
  var current = parseInt(page);
  Promise.all([
    postModel.pageByTextSeach(searchString, limit, offset),
    postModel.countTextSearch(searchString),
  ]).then(([docs, count]) => {
    var total = count;
    var nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    var pages = [];
    for (i = 1; i <= nPages; i++) {
      var obj = { value: i, active: i === +page };
      pages.push(obj);
    }

    res.render('./TrangChu/search', {
      list: docs, moment: moment, pages: pages, current: current, search: searchString,
    });
  })
})


router.post('/them-bai-viet', (req, res, next) => {
  themBaiViet(req, res);
});

function themBaiViet(req, res) {
  console.log(req.body);
  var post = {
    tieuDe: req.body.tieuDe,
    tenChuyenMuc: req.body.tenChuyenMuc,
    imagePath: req.body.imagePath,
    tag: req.body.tag,
    noiDungTomTat: req.body.noiDungTomTat,
    viewNumber: 0,
  }
  postModel.add(post).then(res.json('successfully')).catch(res.json('error'));

}
module.exports = router;
