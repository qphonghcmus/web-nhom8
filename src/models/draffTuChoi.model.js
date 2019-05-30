const mongoose = require('mongoose');

var draffTuChoiSchema = new mongoose.Schema({
    idDraff: Number,
    lyDo:String
});


 mongoose.model('DraffTuChoi', draffTuChoiSchema);