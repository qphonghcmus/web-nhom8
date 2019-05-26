const mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tenTag:String
});



mongoose.model('Tag', tagSchema);