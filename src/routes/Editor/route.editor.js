var express = require('express');
var router = express.Router();
var draft = require('../../models/draft.model');
var drafTuChoi = require('../../models/draftTuChoi.model');
var category = require('../../models/category.model');
var moment = require('moment');
var draftDuyet = require('../../models/draft_Duyet.model');
var post = require('../../models/post.model');
var detail = require('../../models/postDetail.model');
var user=require('../../models/user.model');

router.get('/', (req, res, next) => {
    res.render('./layouts/Editor/main', {
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles: [],
        jsfiles: [],
    });
});

router.get('/admin', (req, res, next) => {
    res.render('./layouts/Editor/main', {
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles: [],
        jsfiles: [],
    });
});

router.get('/update', (req, res, next) => {
    res.render('./layouts/Editor/main', {
        filename: '../../editor/editor_updateProfile.ejs',
        activeUpdate: true,
        cssfiles: [],
        jsfiles: [],
        moment: moment
    });
});

router.post('/update', (req, res, next) => {
    var dob = moment(req.body.birthDay, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        hoTen: req.body.fullname,
        email: req.body.email,
        ngaySinh: dob,
        phoneNumber: req.body.sdt,
        permission: 2,
        category: req.body.category
    }
    user.updateProfile(entity, req.body.email)
        .then(docs => {
            req.logOut()
            res.redirect('/login');
        })
        .catch(err => {
            res.json(err + '');
        })
});

router.get('/approve', (req, res, next) => {

    post.findByEditor(req.user.idUser).then(list => {
        res.render('./layouts/Editor/main', {
            filename: '../../editor/editor_approved.ejs',
            activeApprove: true,
            cssfiles: [
                'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
                'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
            ],
            jsfiles: [
                'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
                'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
                'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
            ],
            listDraft: list,
            moment: require('moment'),
        });
    }).catch()

});

router.get('/reject', (req, res, next) => {

    drafTuChoi.findByEditor(req.user.idUser).then(list => {
        res.render('./layouts/Editor/main', {
            filename: '../../editor/editor_rejected.ejs',
            activeReject: true,
            cssfiles: [
                'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
                'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
            ],
            jsfiles: [
                'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
                'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
                'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
            ],
            listDraft: list
        });
    }).catch(err => console.log(err))

});

router.get('/wait', (req, res, next) => {
    var chuyenmuc = "Quân sự"
    draft.findByChuyenMuc(chuyenmuc).then(list => {
        res.render('./layouts/Editor/main', {
            filename: '../../editor/editor_waiting.ejs',
            activeWait: true,
            cssfiles: [
                'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
                'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
                'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
            ],
            jsfiles: [
                'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
                'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
                'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
                'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js',
                '../../../public/resource/js/editor_waiting.js'
            ],
            listDraft: list
        });
    }).catch(err => console.log(err));

});

router.get('/duyet/:id', (req, res, next) => {
    var id = req.params.id;
    draft.findById(id).then(list => {
        category.findByChuyenMuc(list[0].tenChuyenMuc).then(listCat => {
            var tagsArr = "";
            list[0].tag.forEach(function (e) {
                if (tagsArr.length === 0) {
                    tagsArr = e;
                } else {
                    tagsArr += "," + e;
                }
            })
            res.render('./layouts/Editor/main', {
                filename: '../../editor/editor_duyet.ejs',
                activeWait: true,
                cssfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css'
                ],
                jsfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                    '../../../public/resource/js/editor_duyetbai.js',
                ],
                listCat: listCat,
                draft: list[0],
                tagsArr: tagsArr
            });
        }).catch()

    }).catch()

})

router.post('/duyet/:id', (req, res, next) => {
    var id = req.params.id;

    var tenChuyenMucCon = null;
    if (typeof (req.body.chuyenmuccon) !== 'undefined') tenChuyenMucCon = req.body.chuyenmuccon;

    draft.findById(id).then(succ => {
        var obj_post = {
            tieuDe: succ[0].tieuDe,
            tenChuyenMuc: succ[0].tenChuyenMuc,
            ngayDang: req.body.ngayxuatban,
            imagePath: succ[0].img,
            tag: succ[0].tag,
            noiDungTomTat: succ[0].tomTat,
            chuyenMucCon: tenChuyenMucCon,
            idTacGia: succ[0].idTacGia,
            idEditor: req.user.idUser
        }

        var p1 = post.add(obj_post);
        var p2 = draft.delete(id);
        Promise.all([p1, p2]).then(values => {
            var obj_detail = {
                idBaiViet: values[0],
                noiDung: succ[0].noiDung,
            }
            detail.add(obj_detail).then(succ => {
                res.redirect('/editor/wait');

            }).catch()
        })
    }).catch(err => console.log(err))

})

router.get('/tuchoi/:id', (req, res, next) => {
    var id = req.params.id;
    draft.findById(id).then(list => {
        res.render('./layouts/Editor/main', {
            filename: '../../editor/editor_tuchoi.ejs',
            activeWait: true,
            cssfiles: [
            ],
            jsfiles: [
            ],
            draft: list[0],
        });
    }).catch(err => console.log(err));

})

router.post('/tuchoi/:id', (req, res) => {
    var id = req.params.id;
    draft.findById(id).then(succ => {
        var obj = {
            lyDo: req.body.lidotuchoi,
            tieuDe: succ[0].tieuDe,
            tomTat: succ[0].tomTat,
            noiDung: succ[0].noiDung,
            tenChuyenMuc: succ[0].tenChuyenMuc,
            tag: succ[0].tag,
            img: succ[0].img,
            idTacGia: succ[0].idTacGia,
            idEditor: req.user.idUser,
        }
        drafTuChoi.add(obj).then(succ => {
            draft.delete(id).then(id => {
                res.redirect('/editor/wait');
            }).catch()
        }).catch(err => console.log(err));
    }).catch(err => console.log(err))
})

module.exports = router;