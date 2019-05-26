const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenChuyenMuc:String
});



mongoose.model('Category', CategorySchema);