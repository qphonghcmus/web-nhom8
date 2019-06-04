const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var userSchema = new mongoose.Schema({
    idUser: Number,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: Date,
    phoneNumber: String,
    // tenLoai: {
    //     type: String,
    //     default: 'guest'
    // }
    permission: Number
});

userSchema.plugin(AuToIncrement, { id: 'idUser_Seq', inc_field: 'idUser' });
mongoose.model('User', userSchema);

module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            var obj = new user({
                hoTen: entity.hoTen,
                email: entity.email,
                passWord: entity.passWord,
                ngaySinh: entity.ngaySinh,
                phoneNumber: entity.phoneNumber,
                permission: entity.permission
            })
            obj.save((err, res) => {
                if (err) reject(err)
                else resolve(res.idUser)
            })
        })
    },

    singleByEmail: Email => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.find({ email: Email }).exec((err, res) => {
                if (err) reject(err)
                else resolve(res);
            })
        })
    }
}