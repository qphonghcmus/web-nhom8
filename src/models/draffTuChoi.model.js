const mongoose = require('mongoose');

var draffTuChoiSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lyDo:String
});


 mongoose.model('DraffTuChoi', draffTuChoiSchema);