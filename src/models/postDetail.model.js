const mongoose = require('mongoose');

var postDetailSchema = new mongoose.Schema({
    idBaiViet: Number,
    noiDung: String
});




module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('postdetails', postDetailSchema);
            var obj = new post({
                idBaiViet: entity.idBaiViet,
                noiDung: entity.noiDung
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idBaiViet);
            })
        })
    },

    update: entity => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('postdetails', postDetailSchema);
            post.updateOne({idBaiViet: entity.idBaiViet},{
                noiDung: entity.noiDung,
            }).exec((err,res) => {
                if(err) reject(err)
                else    resolve(res.changedRows)
            })
        })
    },

    findById: id => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('postdetails', postDetailSchema);
            post.find({idBaiViet: id}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    }
}