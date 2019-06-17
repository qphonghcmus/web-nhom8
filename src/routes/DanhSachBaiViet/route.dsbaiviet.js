var express = require('express');
var router = express.Router();
const postModel = require('../../models/post.model');
const moment = require('moment');
const user = require('../../models/user.model');

router.get('/:chuyenmuc', (req, res, next) => {

    var chuyenmuc = req.params.chuyenmuc;
    var page = req.query.page || 1;
    if (page < 1) page = 1;
    var limit = 5;
    var offset = (page - 1) * limit;
    var current = parseInt(page);
    var titlechuyenmuc = getTenChuyeMuc(chuyenmuc);
    var p1

    var p2 = postModel.countByChuyeMuc(titlechuyenmuc)

    if(typeof(req.user) !== 'undefined'){
        var idUser = req.user.idUser;
        user.findByIdUser(idUser).then(users => {
        
            if(users[0].permission === 0){
                p1 = postModel.pageByChuyeMuc_Premium(titlechuyenmuc, limit, offset)
            }else{
                p1 = postModel.pageByChuyeMuc(titlechuyenmuc, limit, offset)
            }
            Promise.all([p1,p2]).then(([docs, count]) => {
            
                var total = count;
                var nPages = Math.floor(total / limit);
                if (total % limit > 0) nPages++;
                var pages = [];
                for (i = 1; i <= nPages; i++) {
                    var obj = { value: i, active: i === +page };
                    pages.push(obj);
                }
                res.render('./DanhSachBaiViet/main', {
                    list: docs, moment: moment, pages: pages, current: current,
                    tenchuyenmuc: titlechuyenmuc
                });
            }).catch(err => {
                res.json('Error ' + err);
            });
        }).catch()
    }else{
        p1 = postModel.pageByChuyeMuc(titlechuyenmuc, limit, offset)
        Promise.all([p1,p2]).then(([docs, count]) => {
            var total = count;
            var nPages = Math.floor(total / limit);
            if (total % limit > 0) nPages++;
            var pages = [];
            for (i = 1; i <= nPages; i++) {
                var obj = { value: i, active: i === +page };
                pages.push(obj);
            }
            res.render('./DanhSachBaiViet/main', {
                list: docs, moment: moment, pages: pages, current: current,
                tenchuyenmuc: titlechuyenmuc
            });
        }).catch(err => {
            res.json('Error ' + err);
        });
    }
});

function getTenChuyeMuc(chuyenmuc) {
    var tenchuyenmuc;
    if (chuyenmuc === 'cong-nghe')
        tenchuyenmuc = 'Công nghệ';
    else if (chuyenmuc === 'the-gioi')
        tenchuyenmuc = 'Thế giới';
    else if (chuyenmuc === 'phap-luat')
        tenchuyenmuc = 'Pháp luật';
    else if (chuyenmuc === 'giao-duc')
        tenchuyenmuc = 'Giáo dục';
    else if (chuyenmuc === 'doi-song')
        tenchuyenmuc = 'Đời sống';
    else if (chuyenmuc === 'quan-su')
        tenchuyenmuc = 'Quân sự';
    else if (chuyenmuc === 'the-thao')
        tenchuyenmuc = 'Thể thao';
    else if (chuyenmuc === 'kinh-doanh')
        tenchuyenmuc = 'Kinh doanh';
    else if (chuyenmuc === 'giai-tri')
        tenchuyenmuc = 'Giải trí';
    else if (chuyenmuc === 'du-lich')
        tenchuyenmuc = 'Du lịch';
    return tenchuyenmuc
}

module.exports = router;