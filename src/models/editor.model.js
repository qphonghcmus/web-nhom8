const mongoose = require('mongoose');

var editorSchema = new mongoose.Schema({
    idUser:Number,
    idChuyenMuc: String
});


 mongoose.model('Editor', editorSchema);