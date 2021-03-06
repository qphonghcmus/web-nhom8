const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);

var draffTuChoiSchema = new mongoose.Schema({
    idDraft: Number,
    lyDo:String,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    tenChuyenMuc: String,
    tag:{
        type: [String]
    },
    img: String,
    idTacGia: Number,
    idEditor: Number,
});
draffTuChoiSchema.plugin(AuToIncrement, { id: 'idDraftTuChoi_Seq', inc_field: 'idDraft' });


 mongoose.model('drafttuchois', draffTuChoiSchema);

 module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var draft =  mongoose.model('drafttuchois', draffTuChoiSchema);
            var obj = new draft({
                lyDo: entity.lyDo,
                tieuDe: entity.tieuDe,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                tenChuyenMuc: entity.tenChuyenMuc,
                tag: entity.tag,
                img: entity.img,
                idTacGia: entity.idTacGia,
                idEditor: entity.idEditor,
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idDraff);
            })
        })
    },
    
    find: () => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.find({}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },
    
    findById: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.find({idDraft: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByAuthor: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.find({idTacGia: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByEditor: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.find({idEditor: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByChuyenMuc: chuyenmuc =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.find({tenChuyenMuc: chuyenmuc}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findWithContent: () => {
        return new Promise((resolve,reject) => {
            var draftTuchoi = mongoose.model('drafttuchois', draffTuChoiSchema);
            draftTuchoi.aggregate(
                [
                    {$lookup: {from: 'drafts',localField:'idDraft',foreignField:'idDraff',as:'drafts'}},
                    {$project: {_id: '$_id',idDraft: '$idDraft',tieuDe: '$tieuDe',tomTat: '$tomTat',noiDung: '$noiDung',
                    tenChuyenMuc: '$tenChuyenMuc',tag: '$tag',img: '$img',lyDo: '$lyDo'}}
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
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.updateOne({idDraft: entity.idDraft},{
                lyDo: entity.lyDo,
                tieuDe: entity.tieuDe,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                tenChuyenMuc: entity.tenChuyenMuc,
                tag: entity.tag,
                img: entity.img,
                idTacGia: entity.idTacGia,
                idEditor: entity.idEditor,
            }).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.changedRows);
            })
        })
    },
    
    delete: id => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafttuchois', draffTuChoiSchema);
            draft.remove({idDraft: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.affectedRows);
            })
        })
    }
 }