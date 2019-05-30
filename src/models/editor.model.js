const mongoose = require('mongoose');

var editorSchema = new mongoose.Schema({
    idUser:Number,
    idChuyenMuc: [Number]
});


 mongoose.model('Editor', editorSchema);