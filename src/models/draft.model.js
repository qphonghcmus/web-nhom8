const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var draffSchema = new mongoose.Schema({
    idDraft: Number,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    tenChuyenMuc: String,
    tag:{
        type: [String]
    },
    img: String,
    idTacGia: Number
});

draffSchema.plugin(AuToIncrement, { id: 'idDraft_Seq', inc_field: 'idDraft' });


module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            var obj = new draft({
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                idTacGia: entity.idTacGia,
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idDraft);
            })
        })
    },

    find: () => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.find({}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findById: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.find({idDraft: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByAuthor: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.find({idTacGia: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    findByChuyenMuc: chuyenmuc =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.find({tenChuyenMuc: chuyenmuc}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    update: entity => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.updateOne({idDraft: entity.idDraft},{
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
                idTacGia: entity.idTacGia
            }).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.changedRows);
            })
        })
    },

    delete: id => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('drafts', draffSchema);
            draft.remove({idDraft: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.affectedRows);
            })
        })
    }
}