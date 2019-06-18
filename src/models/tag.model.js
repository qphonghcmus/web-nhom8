var AuToIncrement = require('mongoose-sequence')(mongoose);
var tagSchema = new mongoose.Schema({
    idTag:Number,
    tenTag:String
});


tagSchema.plugin(AuToIncrement, {id:'idTag_Seq',inc_field: 'idTag'} );
const tag = mongoose.model('tags', tagSchema);

module.exports = {
    loadAll: ()=>{
        return new Promise((resolve,reject)=>{
            tag.find().exec((err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    },

    add: entity =>{
        return new Promise((resolve,reject)=>{
            var obj = new tag({
                tenTag: entity.tenTag
            });
            obj.save((err,res)=>{
                if (err) reject (err)
                else resolve(res.idTag)
            });
        });
    }
}