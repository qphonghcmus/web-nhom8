const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var postSchema = new mongoose.Schema({
    idBaiViet:Number,
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

postSchema.plugin(AuToIncrement, {id:'idBaiViet_Seq',inc_field: 'idBaiViet'} );
 mongoose.model('Post', postSchema);