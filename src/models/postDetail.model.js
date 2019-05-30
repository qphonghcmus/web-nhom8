const mongoose = require('mongoose');

var postDetailSchema = new mongoose.Schema({
    idBaiViet: Number,
    noiDung:String
});


 mongoose.model('PostDetail', postDetailSchema);