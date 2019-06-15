const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);

var draftDuyetSchema = new mongoose.Schema({
    idDraft: Number,
    ngayXuatBan:Date,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    tenChuyenMuc: String,
    chuyenMucCon: String,
    tag:{
        type: [String]
    },
    img: String,
    idTacGia: Number
});
draftDuyetSchema.plugin(AuToIncrement, { id: 'idDraftDuyet_Seq', inc_field: 'idDraft' });

 module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var draft =  mongoose.model('draftduyets', draftDuyetSchema);
            var obj = new draft({
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                idTacGia: entity.idTacGia,
                ngayXuatBan: entity.ngayXuatBan,
                chuyenMucCon: entity.chuyenMucCon
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idDraft);
            })
        })
    },
    
    find: () => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.find({}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },
    
    findById: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.find({idDraft: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },
    findByChuyenMuc: chuyenmuc =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.find({tenChuyenMuc: chuyenmuc}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByAuthor: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.find({idTacGia: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findWithContent: () => {
        return new Promise((resolve,reject) => {
            var draftDuyet = mongoose.model('draftduyets',draftDuyetSchema);
            draftDuyet.aggregate(
                [
                    {$lookup: {from: 'drafts',localField:'idDraft',foreignField:'idDraft',as:'drafts'}},
                    {$project: {_id: '$_id',idDraft: '$idDraft',tieuDe: '$tieuDe',tomTat: '$tomTat',noiDung: '$noiDung',
                    tenChuyenMuc: '$tenChuyenMuc',tag: '$tag',img: '$img',ngayXuatBan: '$ngayXuatBan'}}
                ]
            ).exec((err,res)=>{
                if(err)
                    reject(err);
                else
                    resolve(res);
            })
        })
    },
    
    update: entity => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.updateOne({idDraft: entity.idDraft},{
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                idTacGia: entity.idTacGia,
                ngayXuatBan: entity.ngayXuatBan,
                chuyenMucCon: entity.chuyenMucCon
            }).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.changedRows);
            })
        })
    },
    
    delete: id => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draftduyets', draftDuyetSchema);
            draft.remove({idDraft: entity.idDraft}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.affectedRows);
            })
        })
    }
 }