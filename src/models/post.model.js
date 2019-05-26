const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tieuDe: {
        type: String
        
    },
    tenChuyenMuc: String,
    ngayDang: {
        type: Date,
        default: Date.now
    },
    imagePath: {
        type: String
    },
    tag:{
        type:String
    },
    noiDungTomTat:{
        type:String
    },
    viewNumber: Number
});


 mongoose.model('Post', postSchema);