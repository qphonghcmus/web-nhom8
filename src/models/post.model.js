const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var postSchema = new mongoose.Schema({
    idBaiViet: Number,
    tieuDe: {
        type: String

    },
    tenChuyenMuc: String,
    ngayDang: {
        type: Date,
        default: Date.now
    },
    imagePath: {
        type: String
    },
    tag: {
        type: [String]
    },
    noiDungTomTat: {
        type: String
    },
    viewNumber: Number,
    isActive:Boolean
});

postSchema.plugin(AuToIncrement, { id: 'idBaiViet_Seq', inc_field: 'idBaiViet' });

module.exports = {

    add: entity => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts',postSchema);
            var obj = new post({
                tieuDe : entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                imagePath : entity.imagePath,
                tag : entity.tag,
                noiDungTomTat : entity.noiDungTomTat,
                viewNumber : entity.viewNumber,
                isActive: true,
            })
            obj.save((err, res) => {
                if(err) reject(err)
                else    resolve(res.idBaiViet)
            })
        })
    },

    findByChuyenMuc: chuyenmuc => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({tenChuyenMuc: chuyenmuc}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    countByChuyeMuc: chuyenmuc => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.countDocuments({tenChuyenMuc: chuyenmuc}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyeMuc: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({tenChuyenMuc: chuyenmuc}).skip(offset).sort({ 'ngayDang': -1 }).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    top10latestnews: ()=>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.find({}).sort({'ngayDang': -1}).exec((err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
}