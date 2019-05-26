const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    NoiDung: String,
    idDocGia:mongoose.Schema.Types.ObjectId,
    ngayDang:{
        type:Date,
        default: Date.now
    },
    idBaiViet: mongoose.Schema.Types.ObjectId
});


 mongoose.model('Comment', commentSchema);