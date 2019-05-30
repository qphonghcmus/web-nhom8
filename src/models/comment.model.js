const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var commentSchema = new mongoose.Schema({
    idComment: Number,
    NoiDung: String,
    idDocGia:Number,
    ngayDang:{
        type:Date,
        default: Date.now
    },
    idBaiViet: Number,
});

commentSchema.plugin(AuToIncrement,{id:'idComment_Seq',inc_field: 'idComment'});
 mongoose.model('Comment', commentSchema);