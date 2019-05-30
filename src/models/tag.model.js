const mongoose = require('mongoose');
var AuToIncrement = require('mongoose-sequence')(mongoose);
var tagSchema = new mongoose.Schema({
    idTag:Number,
    tenTag:String
});


tagSchema.plugin(AuToIncrement, {id:'idTag_Seq',inc_field: 'idTag'} );
mongoose.model('Tag', tagSchema);