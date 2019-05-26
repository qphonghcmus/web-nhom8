const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: String,
    tenLoai:String
});


 mongoose.model('User', userSchema);