var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/auth');
var categories = require('../../models/category.model');
var draft = require('../../models/draft.model');
var draftTuchoi = require('../../models/draftTuChoi.model');
var draftDuyet = require('../../models/draft_Duyet.model');
var moment = require('moment');
var post = require('../../models/post.model');
var user = require('../../models/user.model');
var bcrypt = require('bcrypt');
var change_password = false; // TH không thay pass

router.get('/', auth, (req, res, next) => {
    res.render('./layouts/Writer/main', {
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles: [],
        jsfiles: [],
        moment: moment
    });
});

router.get('/add/:chuyenmuc', (req, res, next) => {
    var chuyenmuc = req.params.chuyenmuc;
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

    categories.add(tenchuyenmuc)
        .then(id => {
            res.json('successfully');
        }).catch()
})

router.get('/admin', (req, res, next) => {
    res.render('./layouts/Writer/main', {
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles: [],
        jsfiles: [],
    });
});

router.get('/update', (req, res, next) => {
    // var p1 = user.findByIdUser(authUser.idUser);

    // Promise.all([p1]).then(values => {
    res.render('./layouts/Writer/main', {
        filename: '../../writer/writer_update',
        activeUpdate: true,
        cssfiles: [],
        jsfiles: [],
        moment: require('moment')
    });
    // }).catch()
});

router.post('/update', (req, res, next) => {
    var hash = null;
    if (change_password) { // TH thay pass cần hash
        var saltRounds = 10;
        hash = bcrypt.hashSync(req.body.password_new, saltRounds);
    }
    else {
        hash = req.user.passWord; // Ko thay pass thì lấy pass cũ tạo entity
    }
    var dob = moment(req.body.birthDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var entity = {
        hoTen: req.body.fullname,
        email: req.user.email,
        passWord: hash,
        ngaySinh: dob,
        phoneNumber: req.body.sdt,
        permission: 1,
        penName: req.body.penName
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
router.get('/update/password_correct', (req, res, next) => { //xử lí remote nhập pass cũ đúng chưa
    var pass = req.query.password_present;
    var ret = bcrypt.compareSync(pass, req.user.passWord);
    if (ret) {
        change_password = true; // TH thay pass
        return res.json(true);
    }
    else
        return res.json(false);
});

router.get('/post', (req, res, next) => {
    categories.load()
        .then(list => {
            var listCat = [];
            list.forEach(function (e) {
                listCat.push(e.tenChuyenMuc);
            })
            res.render('./layouts/Writer/main', {
                filename: '../../writer/writer_post.ejs',
                activePost: true,
                cssfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
                ],
                jsfiles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                    '../../../public/resource/js/editor.upload.js'
                ],
                listCat: listCat,
            });
        })
        .catch()

});

router.post('/post', (req, res, next) => {

    var tagsArr = req.body.tags.split(",");

    var entityDraft = {
        tieuDe: req.body.tieude,
        tenChuyenMuc: req.body.chuyenmuc,
        img: req.body.imgPath,
        tag: tagsArr,
        tomTat: req.body.tomtat,
        noiDung: req.body.wysiwyg,
        idTacGia: req.user.idUser
    }

    draft.add(entityDraft).then(id => {
        res.redirect('/writer/post')
    }).catch(err => console.log(err))

});

router.get('/waitPublish', (req, res, next) => {
    var idTacGia = req.user.idUser;
    draftDuyet.findByAuthor(idTacGia).then(list => {
        res.render('./layouts/Writer/main', {
            filename: '../../writer/writer_waitPublish.ejs',
            activeWaitPublish: true,
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
        });
    }).catch()

});

router.get('/published', (req, res, next) => {
    var idTacGia = req.user.idUser;
    post.findByAuthor(idTacGia).then(list => {
        res.render('./layouts/Writer/main', {
            filename: '../../writer/writer_published.ejs',
            activePublish: true,
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
            listDraft: []
        });
    }).catch()

});

router.get('/rejected', (req, res, next) => {
    var idTacGia = req.user.idUser;
    draftTuchoi.findByAuthor(idTacGia).then(list => {
        res.render('./layouts/Writer/main', {
            filename: '../../writer/writer_rejected.ejs',
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

router.get('/waitReview', (req, res, next) => {
    var idTacGia = req.user.idUser
    draft.findByAuthor(idTacGia).then(list => {
        res.render('./layouts/Writer/main', {
            filename: '../../writer/writer_waitReview.ejs',
            activeWaitReview: true,
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
            drafts: list,
        });
    }).catch(err => console.log(err))

});

router.get('/edit', (req, res, next) => {
    var idTacGia = req.user.idUser
    draft.findByAuthor(idTacGia).then(list => {
        draftTuchoi.findByAuthor(idTacGia).then(list2 => {
            res.render('./layouts/Writer/main', {
                filename: '../../writer/writer_edit.ejs',
                activeEdit: true,
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
                drafts: list,
                draftTuChoi: list2
            });
        }).catch()

    }).catch(err => console.log(err))
});

router.get('/editPage/:id&:type', (req, res, next) => {
    var idBaiViet = Number(req.params.id);
    var type = req.params.type;

    if (type === "choduyet") {
        draft.findById(idBaiViet).then(baiviet => {
            var tags = "";
            baiviet[0].tag.forEach(function (e) {
                if (tags.length === 0) {
                    tags = e;
                } else {
                    tags += "," + e;
                }
            })

            var obj = {
                id: idBaiViet,
                tieuDe: baiviet[0].tieuDe,
                tenChuyenMuc: baiviet[0].tenChuyenMuc,
                imagePath: baiviet[0].img,
                tag: tags,
                noiDungTomTat: baiviet[0].tomTat,
                noiDung: baiviet[0].noiDung,
                idTacGia: req.user.idUser
            }

            categories.load().then(list => {
                var listCat = [];
                list.forEach(function (e) {
                    listCat.push(e.tenChuyenMuc);
                })
                res.render('./layouts/Writer/main', {
                    filename: '../../writer/writer_editPage.ejs',
                    activeEdit: true,
                    cssfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
                    ],
                    jsfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                        '../../../public/resource/js/editor.editPage.js',
                    ],
                    post: obj,
                    listCat: listCat,
                    typeDraft: type
                });
            }).catch()

        }).catch();
    }
    if (type === "tuchoi") {
        draftTuchoi.findById(idBaiViet).then(baiviet => {
            var tags = "";
            baiviet[0].tag.forEach(function (e) {
                if (tags.length === 0) {
                    tags = e;
                } else {
                    tags += "," + e;
                }
            })

            var obj = {
                id: idBaiViet,
                tieuDe: baiviet[0].tieuDe,
                tenChuyenMuc: baiviet[0].tenChuyenMuc,
                imagePath: baiviet[0].img,
                tag: tags,
                noiDungTomTat: baiviet[0].tomTat,
                noiDung: baiviet[0].noiDung,
                idTacGia: req.user.idUser
            }

            categories.load().then(list => {
                var listCat = [];
                list.forEach(function (e) {
                    listCat.push(e.tenChuyenMuc);
                })
                res.render('./layouts/Writer/main', {
                    filename: '../../writer/writer_editPage.ejs',
                    activeEdit: true,
                    cssfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
                    ],
                    jsfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                        '../../../public/resource/js/editor.editPage.js',
                    ],
                    post: obj,
                    typeDraft: type,
                    listCat: listCat,
                });
            }).catch()

        }).catch();
    }
});

router.post('/editPage/:id&:type', (req, res, next) => {
    var tagsArr = req.body.tags.split(",");
    var type = req.params.type;

    var entityDraft = {
        idDraft: Number(req.params.id),
        tieuDe: req.body.tieude,
        tenChuyenMuc: req.body.chuyenmuc,
        img: req.body.imgPath,
        tag: tagsArr,
        tomTat: req.body.tomtat,
        noiDung: req.body.wysiwyg,
        idTacGia: req.user.idUser
    }
    if (type === "tuchoi") {
        draftTuchoi.delete(req.params.id).then(succ => {
            draft.add(entityDraft).then(id => {
                res.redirect('/writer/edit')
            }).catch()
        })
    }
    if (type === "choduyet") {
        draft.update(entityDraft).then(id => {
            res.redirect('/writer/edit')
        }).catch(err => console.log(err))
    }
})

router.get('/edit/delete/:id', (req, res, next) => {
    var id = req.params.id;
    draft.delete(id).then(succ => {
        res.redirect('/writer/edit')
    }).catch()
})

module.exports = router;