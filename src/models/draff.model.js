const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var draffSchema = new mongoose.Schema({
    idDraff: Number,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    tenChuyenMuc: String,
    tag:{
        type: [String]
    },
    img: String,
});

draffSchema.plugin(AuToIncrement, { id: 'idDraff_Seq', inc_field: 'idDraff' });


module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draffs', draffSchema);
            var obj = new draft({
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idDraff);
            })
        })
    },

    findById: id =>{
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draffs', draffSchema);
            draft.find({idDraff: id}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res);
            })
        })
    },

    update: entity => {
        return new Promise((resolve, reject) => {
            var draft = mongoose.model('draffs', draffSchema);
            draft.updateOne({idDraff: entity.idDraff},{
                tieuDe: entity.tieuDe,
                tenChuyenMuc: entity.tenChuyenMuc,
                img: entity.img,
                tag: entity.tag,
                tomTat: entity.tomTat,
                noiDung: entity.noiDung,
            }).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res.changedRows);
            })
        })
    }
}