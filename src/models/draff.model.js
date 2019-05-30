const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var draffSchema = new mongoose.Schema({
    idDraff:Number,
    tieuDe: String,
    tomTat: String,
    noiDung: String,
    idChuyenMuc: mongoose.Schema.Types.ObjectId,
    tag: String
});

draffSchema.plugin(AuToIncrement,{id:'idDraff_Seq',inc_field: 'idDraff'});
 mongoose.model('Draff', draffSchema);