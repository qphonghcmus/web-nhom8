var express = require('express');
var router = express.Router();
var postModel = require('../../models/post.model');
const moment = require('moment');
var detail = require('../../models/postDetail.model');
var user = require('../../models/user.model');
var comment = require('../../models/comment.model');

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

  var p1
  var p2 = postModel.countTextSearch(searchString);
  if (typeof (req.user) !== 'undefined') {
    var idUser = req.user.idUser;
    user.findByIdUser(idUser).then(users => {
      if (users[0].permission === 0) {

        p1 = postModel.pageByTextSeach_Premium(searchString, limit, offset)
      } else {
        p1 = postModel.pageByTextSeach(searchString, limit, offset)
      }
      Promise.all([p1, p2]).then(([docs, count]) => {
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

    }).catch()
  } else {
    p1 = postModel.pageByTextSeach(searchString, limit, offset)
    Promise.all([p1, p2]).then(([docs, count]) => {
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
  }


})

router.get('/post/:id', (req, res, next) => {

  var page = req.query.page || 1;
  if (page < 1) page = 1;
  var limit = 5;
  var offset = (page - 1) * limit;
  var current = parseInt(page);

  var idBaiViet = req.params.id;
    Promise.all([
      postModel.findById(idBaiViet),
      detail.findById(idBaiViet),
    ]).then(values => {
      if(values[0][0].isPremium === true){
        if(!req.user){ res.redirect('/')
        }
        else{
        var idDocGia = req.user.idUser

        user.findByIdUser(idDocGia).then(users => {
          if(users[0].permission === 0) {
            if(users[0].NgayHetHan <= Date.now() ){
              res.redirect('/')
            }else{
              Promise.all([
                postModel.find5News(values[0][0].tenChuyenMuc, idBaiViet),
                user.findByIdUser(values[0][0].idTacGia),
                postModel.updateViews(idBaiViet, values[0][0].viewNumber),
                // comment.findByIdBaiViet(idBaiViet),
                comment.pageByIdBaiViet(idBaiViet,limit,offset),
                comment.countByIdBaiViet(idBaiViet)
              ]).then(values2 => {
                var total = values2[4];
                var nPages = Math.floor(total / limit);
                if (total % limit > 0) nPages++;
                var pages = [];
                for (i = 1; i <= nPages; i++) {
                    var obj = { value: i, active: i === +page };
                    pages.push(obj);
                }
                res.render('./BaiViet/main', {
                  news: values[0][0],
                  content: values[1][0].noiDung,
                  moment: moment,pages: pages, current: current,
                  author: values2[1][0].penName,
                  top5news: values2[0],
                  comment: values2[3],
                })
              }).catch()
            }
          }else{
            res.redirect('/')
          }
        }).catch()}

      }else{

      Promise.all([
        postModel.find5News(values[0][0].tenChuyenMuc, idBaiViet),
        user.findByIdUser(values[0][0].idTacGia),
        postModel.updateViews(idBaiViet, values[0][0].viewNumber),
        // comment.findByIdBaiViet(idBaiViet),
                comment.pageByIdBaiViet(idBaiViet,limit,offset),
                comment.countByIdBaiViet(idBaiViet)
      ]).then(values2 => {
        var total = values2[4];
                var nPages = Math.floor(total / limit);
                if (total % limit > 0) nPages++;
                var pages = [];
                for (i = 1; i <= nPages; i++) {
                    var obj = { value: i, active: i === +page };
                    pages.push(obj);
                }
        res.render('./BaiViet/main', {
          news: values[0][0],
          content: values[1][0].noiDung,
          moment: moment,pages: pages, current: current,
          author: values2[1][0].penName,
          top5news: values2[0],
          comment: values2[3],
        })
      }).catch()
    }
    }).catch()
})

router.post('/post/cmt/:id', (req, res, next) => {

  if (!req.user) {
    res.redirect('/login');
  } else {

    var idUser = req.user.idUser;
    var message = req.body.message

    var obj_cmt = {
      NoiDung: message,
      idDocGia: idUser,
      tenDoiGia: req.user.hoTen,
      ngayDang: new Date(),
      idBaiViet: req.params.id
    }

    comment.add(obj_cmt).then(id => {
      res.redirect('/post/' + req.params.id)
    }).catch()
  }
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
