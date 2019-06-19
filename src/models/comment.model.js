const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var commentSchema = new mongoose.Schema({
    idComment: Number,
    NoiDung: String,
    idDocGia: Number,
    tenDoiGia: String,
    ngayDang: {
        type: Date,
        default: Date.now
    },
    idBaiViet: Number,
});

commentSchema.plugin(AuToIncrement, { id: 'idComment_Seq', inc_field: 'idComment' });
const cmt = mongoose.model('comments', commentSchema);

module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var obj = new cmt({
                NoiDung: entity.NoiDung,
                idDocGia: entity.idDocGia,
                tenDoiGia: entity.tenDoiGia,
                ngayDang: entity.ngayDang,
                idBaiViet: entity.idBaiViet,
            })
            obj.save((err, res) => {
                if (err) reject(err)
                else resolve(res.idBaiViet)
            })
        })
    },

    findByIdBaiViet: id => {
        return new Promise((resolve, reject) => {
            cmt.find({ idBaiViet: id }).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    countByIdBaiViet: id => {
        return new Promise((resolve, reject) => {
            cmt.countDocuments({ idBaiViet: id }).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByIdBaiViet: (id,limit,offset) => {
        return new Promise((resolve, reject) => {
            cmt.find({idBaiViet: id}).skip(offset).sort({ 'ngayDang': -1}).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },
}
