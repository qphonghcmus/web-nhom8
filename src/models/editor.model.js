const mongoose = require('mongoose');

var editorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idChuyenMuc: [mongoose.Schema.Types.ObjectId]
});


 mongoose.model('Editor', editorSchema);