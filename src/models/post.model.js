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
    chuyenMucCon: String,
    isActive:Boolean,
    idTacGia: Number,
    idEditor: Number,
    isPremium: Boolean
});

postSchema.index({
    tieuDe: 'text',
    tenChuyenMuc: 'text',
    tag: 'text',
    noiDungTomTat: 'text',
    chuyenMucCon: 'text'
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
                idEditor: entity.idEditor,
                chuyenMucCon: entity.chuyenMucCon
            })
            obj.save((err, res) => {
                if(err) reject(err)
                else    resolve(res.idBaiViet)
            })
        })
    },

    findByNewsWaitPublish: id =>{
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{idTacGia: id},{ngayDang:{$gt: new Date()}}]}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    findByNewsPublished: id =>{
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{idTacGia: id},{ngayDang:{$lte: new Date()}}]}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
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
            post.find({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).exec((err,res) =>{
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

    find5News: (chuyenmuc,idNews) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}},{idBaiViet: {$ne:idNews}}]}).sort({ 'ngayDang': -1 }).limit(5).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    updateViews: (id,view) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.update({idBaiViet: id},{viewNumber: view + 1}).exec((err,res)=>{
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

    countByChuyenMucCon: chuyenmuc => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.countDocuments({ $and: [{chuyenMucCon: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyeMuc: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).skip(offset).sort({ 'ngayDang': -1}).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyenMucCon: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{chuyenMucCon: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).skip(offset).sort({ 'ngayDang': -1}).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyeMuc_Premium: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{tenChuyenMuc: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).skip(offset).sort({ 'isPremium':-1,'ngayDang': -1 }).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    pageByChuyenMucCon_Premium: (chuyenmuc,limit,offset) => {
        return new Promise((resolve, reject) => {
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [{chuyenMucCon: chuyenmuc},{ngayDang:{$lte: new Date()}}]}).skip(offset).sort({ 'isPremium':-1,'ngayDang': -1 }).limit(limit).exec((err,res) =>{
                if(err) reject(err);
                else    resolve(res);
            })
        })
    },

    countTextSearch: searchString =>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.countDocuments({$text: {$search: searchString}}).exec((err,res) =>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    pageByTextSeach: (searchString,limit,offset) =>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({$text: {$search: searchString}},
                {score: {$meta: 'textScore'}}
                ).sort(
                    {score: {$meta: 'textScore'}}
                    ).skip(offset).limit(limit).exec((err,res) =>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    pageByTextSeach_Premium: (searchString,limit,offset) =>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({$text: {$search: searchString}},
                {score: {$meta: 'textScore'}}
                ).sort({
                    'isPremium':-1,
                    score: {$meta: 'textScore'},
                }).skip(offset).limit(limit).exec((err,res) =>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    textsearch: searchString => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({$text: {$search: searchString}},
                {score: {$meta: 'textScore'}}
                ).sort(
                    {score: {$meta: 'textScore'}}
                    ).limit(10).exec((err,res) =>{
                if(err) reject(err)
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

    top10latestnews_NonPremium: ()=>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.find( {
                $and: [{ngayDang:{$lte: new Date()}},
                    {isPremium: false}]}
                ).sort({'ngayDang': -1}).limit(10).exec((err,res)=>{
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

    top10mostviewsnews_Premium: () => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts', postSchema);
            post.find({ $and: [
                {ngayDang:{$lte: new Date()}},{isPremium: true}
            ]}).sort({'viewNumber': -1}).limit(10).exec((err,res)=>{
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
    },
    findToManageTag: ()=>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({},'idBaiViet tieuDe tag').exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    },
   findByIDToManageTag: id => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({idBaiViet:id},'idBaiViet tieuDe tag').exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    updateTag: (id,newTag) =>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.findOneAndUpdate({ idBaiViet: id },{$set:{tag:newTag}} , { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        });
    },
    findToManagePostPublished: ()=>{
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.find({},'idBaiViet tieuDe tenChuyenMuc').exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    deleteById: id => {
        return new Promise((resolve,reject)=>{
            var post = mongoose.model('posts',postSchema);
            post.remove({idBaiViet:id}).exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            })
        });
    }
}