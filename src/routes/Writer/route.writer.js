var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/admin', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/update', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_update',
        activeUpdate: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/post', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_post.ejs',
        activePost: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-post.css'
        ],
        jsfiles:[],
    });
});

router.get('/waitPublish', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_waitPublish.ejs',
        activeWaitPublish: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[],
    });
});

router.get('/published', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_published.ejs',
        activePublish: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[],
    });
});

router.get('/rejected', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_rejected.ejs',
        activeReject: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[],
    });
});

router.get('/waitReview', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_waitReview.ejs',
        activeWaitReview: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[],
    });
});

router.get('/edit', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_edit.ejs',
        activeEdit: true,
        cssfiles:[
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[
            '../../../public/resource/js/writer-edit.js'],
    });
});

router.get('/editPage', (req, res) => {
    res.render('./layouts/Writer/main',{
        filename: '../../writer/writer_editPage.ejs',
        activeEditPage: true,
        cssfiles:[
            '../../../public/resource/CSS/style-write-edit.css'
        ],
        jsfiles:[],
    });
});

module.exports = router;