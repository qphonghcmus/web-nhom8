var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/admin', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/update', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_update',
        activeUpdate: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/post', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_post.ejs',
        activePost: true,
        cssfiles:['style-writer-post'],
        jsfiles:[],
    });
});

router.get('/waitPublish', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_waitPublish.ejs',
        activeWaitPublish: true,
        cssfiles:['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/published', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_published.ejs',
        activePublish: true,
        cssfiles:['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/rejected', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_rejected.ejs',
        activeReject: true,
        cssfiles:['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/waitReview', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_waitReview.ejs',
        activeWaitReview: true,
        cssfiles:['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/edit', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_edit.ejs',
        activeEdit: true,
        cssfiles:['style-writer-published'],
        jsfiles:['writer-edit'],
    });
});

router.get('/editPage', (req, res) => {
    res.render('./layouts/Writer/writer.ejs',{
        filename: '../../writer/writer_editPage.ejs',
        activePost: true,
        cssfiles:['style-write-edit'],
        jsfiles:[],
    });
});

module.exports = router;