const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema
var userSchema = new mongoose.Schema({
    idUser: Number,
    hoTen: String,
    email: String,
    passWord: String,
    ngaySinh: Date,
    penName: String, // đối với writer cần bút danh
    phoneNumber: String,
    NgayDK: Date,
    wait_extension: {
        type: Boolean,
        default: false
    },
    accept_extension: {
        type: Boolean,
        default: false
    },
    NgayHetHan: Date, // ngày hết hạn chính thức
    NgayHetHan_Temp: Date, // dùng để hiển thị trong ds chờ phê duyệt, ngày hết hạn => chính thức khi đc chấp nhận 
    secretToken: String,
    confirmed: {
        type: Boolean,
        default: false
    },
    category: String, // đối với editor
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
                penName: entity.penName,
                phoneNumber: entity.phoneNumber,
                confirmed: entity.confirmed,
                NgayDK: entity.NgayDK,
                NgayHetHan: entity.NgayHetHan,
                NgayHetHan_Temp: entity.NgayHetHan_Temp,
                category: entity.category,
                permission: entity.permission
            })
            obj.save((err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    },

    addListWaitAcceptPremium: (Email) => {
        var endDate = new Date();
        var numberOfDaysToAdd = 7;
        endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findOneAndUpdate({ email: Email }, { wait_extension: true, NgayHetHan_Temp: endDate }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    AcceptPremium: (ID) => {
        var startDate = new Date();
        var endDate = new Date();
        var numberOfDaysToAdd = 7;
        endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findByIdAndUpdate(ID, { wait_extension: false, NgayDK: startDate, accept_extension: true, NgayHetHan: endDate }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    UnAcceptPremium: (ID) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findByIdAndUpdate(ID, { wait_extension: false }, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
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
    },

    DisplayListWriter: () => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.find({ permission: 1 }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    DisplayListSubcriber: () => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.find({ permission:0 }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    DisplayListSubcriberWaitAccept: () => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.find({ wait_extension: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    DisplayListEditor: () => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.find({ permission: 2 }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    DeleteUser: (ID) => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('User', userSchema);
            user.findByIdAndRemove(ID).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    findByIdUser: id => {
        return new Promise((resolve, reject) => {
            var user = mongoose.model('users', userSchema);
            user.find({ idUser: id }).exec((err, res) => {
                if (err) reject(err)
                else resolve(res);
            })
        })
    }
}