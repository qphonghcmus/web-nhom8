const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var userSchema = new mongoose.Schema({
    idUser:Number,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: String,
    tenLoai:String
});

userSchema.plugin(AuToIncrement, {id:'idUser_Seq',inc_field: 'idUser'});
 mongoose.model('User', userSchema);