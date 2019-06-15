const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var userSchema = new mongoose.Schema({
    idUser: Number,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: Date,
    avatar: String,
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

    turnoncomfirmded: (Email) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, { confirmed: true }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    turnoffcomfirmded: (Email) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, { confirmed: false }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    updateSecretToken_Password: (Email, token, pass) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, { secretToken: token, passWord: pass }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }
}