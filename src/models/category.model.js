const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var CategorySchema = new mongoose.Schema({
    idChuyenMuc:Number,
    tenChuyenMuc:String
});


CategorySchema.plugin(AuToIncrement, {id:'idChuyenMuc_Seq',inc_field: 'idChuyenMuc'} );
mongoose.model('categories', CategorySchema);