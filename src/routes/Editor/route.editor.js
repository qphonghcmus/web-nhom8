var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/admin', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/update', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_updateProfile.ejs',
        activeUpdate: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/approve', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_approved.ejs',
        activeApprove: true,
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

router.get('/reject', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_rejected.ejs',
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

router.get('/wait', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_waiting.ejs',
        activeWait: true,
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
            'https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap.min.js',
            '../../../public/resource/js/editor_waiting.js'
        ],
    });
});

router.get('/duyet', (req,res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_duyet.ejs',
        activeWait: true,
        cssfiles:[
        ],
        jsfiles:[
        ],
    });
})

router.get('/tuchoi', (req,res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_tuchoi.ejs',
        activeWait: true,
        cssfiles:[
        ],
        jsfiles:[
        ],
    });
})

module.exports = router;