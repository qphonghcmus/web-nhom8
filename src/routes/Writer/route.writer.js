var express = require('express');
var router = express.Router();
var auth = require('../../middlewares/auth');
var post = require('../../models/post.model');
var counters = require('../../models/counters.model');
var postDetail = require('../../models/postDetail.model');

router.get('/', auth, (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/admin', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/update', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_update',
        activeUpdate: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/post', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_post.ejs',
        activePost: true,
        cssfiles:[
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
        ],
        jsfiles:[
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
            '../../../public/resource/js/editor.upload.js'
        ],
    });
});

router.post('/post', (req, res, next) => {

    var entityPost = {
        tieuDe: req.body.tieude,
        tenChuyenMuc: req.body.chuyenmuc,
        imagePath: req.body.imgPath,
        tag: tagsArr,
        noiDungTomTat: req.body.tomtat,
        viewNumber: 0,
    }

    post.add(entityPost).then(id => {
        var entityDetail = {
            idBaiViet: id,
            noiDung: req.body.wysiwyg
        }
        postDetail.add(entityDetail)
        .then(id => res.redirect('/writer/waitPublish'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get('/waitPublish', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_waitPublish.ejs',
        activeWaitPublish: true,
        cssfiles:[
            'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
            'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
        ],
        jsfiles:[
            'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
            'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
        ],
    });
});

router.get('/published', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_published.ejs',
        activePublish: true,
        cssfiles:[
            'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
            'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
        ],
        jsfiles:[
            'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
            'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
        ],
    });
});

router.get('/rejected', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_rejected.ejs',
        activeReject: true,
        cssfiles:[
            'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
            'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
        ],
        jsfiles:[
            'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
            'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
        ],
    });
});

router.get('/waitReview', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_waitReview.ejs',
        activeWaitReview: true,
        cssfiles:[
            'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
            'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
        ],
        jsfiles:[
            'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
            'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
        ],
    });
});

router.get('/edit', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_edit.ejs',
        activeEdit: true,
        cssfiles:[
            'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css',
            'https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.bootstrap.min.css',
            'https://cdn.datatables.net/responsive/2.2.3/css/responsive.jqueryui.min.css'
        ],
        jsfiles:[
            'https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js',
            'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js',
            'https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js',
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js'
        ],
    });
});

router.get('/editPage', (req, res,next) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_editPage.ejs',
        activeEdit: true,
        cssfiles:[
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css'
        ],
        jsfiles:[
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
            '../../../public/resource/js/editor.upload.js'
        ],
    });
});

module.exports = router;