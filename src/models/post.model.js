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
	chuyenMucCon: [String],
    isActive:Boolean,
    idTacGia: Number,
    idEditor: Number
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
                viewNumber : 0,
                isActive: true,
                idTacGia: entity.idTacGia,
                ngayDang: entity.ngayDang,
                idEditor: entity.idEditor
            })
            obj.save((err, res) => {
                if(err) reject(err)
                else    resolve(res.idBaiViet)
            })
        })
    },

    findById: id =>{
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({idBaiViet: id}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
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

    findByAuthor: id =>{
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({idTacGia: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByEditor: id =>{
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({idEditor: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    countByChuyeMuc: chuyenmuc => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.countDocuments({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyeMuc: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).skip(offset).sort({ 'ngayDang': -1 }).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    top10latestnews: ()=>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.find({ngayDang:{$lte: new Date()}}).sort({'ngayDang': -1}).limit(10).exec((err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    },

    top10mostviewsnews: () => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.find({ngayDang:{$lte: new Date()}}).sort({'viewNumber': -1}).limit(10).exec((err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    },

    top4mostviewsnews: (days) => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            var moment = require('moment');
            var end = new Date();
            var star = new Date(moment(end).subtract(days,'day').toISOString());

            post.find({ngayDang:{$lt: end, $gte: star}}).sort({'viewNumber': -1}).limit(4).exec((err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    },

    top1newsof10cat: () => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.aggregate([
                {$match: {ngayDang:{$lte: new Date()}}},
                {   $sort: {'tenChuyenMuc':1}},
                {
                    $group:{
                        _id: '$tenChuyenMuc',
                        lastId: {$last: '$_id'},
                        ngayDang: {$last: '$ngayDang'},
                        tieuDe: {$last: '$tieuDe'},
                        idBaiViet: {$last: '$idBaiViet'},
                        imagePath: {$last: '$imagePath'},
                        tag: {$last: '$tag'},
                        noiDungTomTat: {$last: '$noiDungTomTat'},
                        viewNumber: {$last: '$viewNumber'},
                        chuyenMucCon: {$last: '$chuyenMucCon'},
                        isActive: {$last: '$isActive'},
                        idTacGia: {$last: '$idTacGia'},
                    }
                },{
                    $project: {
                        _id: '$lastId',
                        idBaiViet: 1,
                        tieuDe: 1,
                        tenChuyenMuc: '$_id',
                        ngayDang: 1,
                        imagePath: 1,
                        tag: 1,
                        noiDungTomTat: 1,
                        viewNumber: 1,
                        chuyenMucCon: 1,
                        isActive:1,
                        idTacGia: 1,
                    }
                }
                
            ]).exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            })
        })
    },
	
	 countBySearchString: (searchString, tenChuyenMuc) => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.count({
                $and: [
               { tenChuyenMuc:tenChuyenMuc},
                 searchString
                ]
            }).exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

    findBySearchString: (searchString,tenChuyenMuc,skip,limit) => {
        return new Promise((resolve,reject) =>{
            var post = mongoose.model('posts', postSchema);
            post.find({
                $and: [
                    { tenChuyenMuc: tenChuyenMuc },
                   searchString
                ]
            },'idBaiViet tieuDe isActive').skip(Number(skip)).limit(Number(limit)).exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            })
        })
    }

}