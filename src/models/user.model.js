const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var userSchema = new mongoose.Schema({
    idUser: Number,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: Date,
    phoneNumber: String,
    secretToken: String,
    confirmed: {
        type: Boolean,
        default: false
    },
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
                secretToken: entity.secretToken,
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
    },

    updateProfile: (entity, Email) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, entity, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    turncomfirmded: (Email) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, { confirmed: true }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }
}