var express = require('express');

var router = express.Router();


router.get('/', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
        
    });
});

router.get('/admin', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_admin',
        activeAdmin: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/update', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_updateProfile.ejs',
        activeUpdate: true,
        cssfiles:[],
        jsfiles:[],
    });
});

router.get('/approve', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_approved.ejs',
        activeApprove: true,
        cssfiles:['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/reject', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_rejected.ejs',
        activeReject: true,
        cssfiles: ['style-writer-published'],
        jsfiles:[],
    });
});

router.get('/wait', (req, res) => {
    res.render('./layouts/Editor/editor.ejs',{
        filename: '../../editor/editor_waiting.ejs',
        activeWait: true,
        cssfiles: ['style-writer-published','style-editor-waiting'],
        jsfiles:['editor_waiting'],
    });
});

module.exports = router;