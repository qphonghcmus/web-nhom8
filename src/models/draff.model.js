const mongoose = require('mongoose');

var draffSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    idChuyenMuc: mongoose.Schema.Types.ObjectId,
    tag: String
});


 mongoose.model('Draff', draffSchema);