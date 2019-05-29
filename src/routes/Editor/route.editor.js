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
            '../../../public/resource/CSS/style-writer-published.css'
        ],
        jsfiles:[],
    });
});

router.get('/reject', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_rejected.ejs',
        activeReject: true,
        cssfiles: [
            '../../../public/resource/CSS/style-writer-published.css'],
        jsfiles:[],
    });
});

router.get('/wait', (req, res) => {
    res.render('./layouts/Editor/main',{
        filename: '../../editor/editor_waiting.ejs',
        activeWait: true,
        cssfiles: [
            '../../../public/resource/CSS/style-writer-published.css',
            '../../../public/resource/CSS/style-editor-waiting.css'],
        jsfiles:[
            '../../../public/resource/js/editor_waiting.js'],
    });
});

module.exports = router;