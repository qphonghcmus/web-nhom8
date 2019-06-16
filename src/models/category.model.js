const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var CategorySchema = new mongoose.Schema({
    idChuyenMuc:Number,
    tenChuyenMuc:String,
    chuyenMucCon: [String],
});

mongoose.model('categories', CategorySchema);
CategorySchema.plugin(AuToIncrement, {id:'idChuyenMuc_Seq',inc_field: 'idChuyenMuc'} );

module.exports = {
    add: chuyenmuc => {
        return new Promise((resolve, reject) => {
            var cat = mongoose.model('categories', CategorySchema);
            var obj = new cat({
                tenChuyenMuc: chuyenmuc
            })
            obj.save((err,res)=>{
                if(err) reject(err)
                else    resolve(res.idChuyenMuc);
            })
        })
    },

    update: entity => {
        return new Promise((resolve,reject)=>{
            var cat = mongoose.model('categories',CategorySchema);
            cat.updateOne({idChuyenMuc: entity.idChuyenMuc},{
                tenChuyenMuc: entity.tenChuyenMuc,
            }).exec((err,res => {
                if(err) reject(err)
                else    resolve(res.changedRowsO)
            }))
        })
    },

    findByChuyenMuc: chuyenmuc => {
        return new Promise((resolve, reject)=>{
            var cat = mongoose.model('categories',CategorySchema);
            cat.find({tenChuyenMuc: chuyenmuc}).exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res)
            })
        })
    },

    load: () => {
        return new Promise((resolve, reject)=>{
            var cat = mongoose.model('categories',CategorySchema);
            cat.find().exec((err,res)=>{
                if(err) reject(err)
                else    resolve(res)
            })
        })
    }
}