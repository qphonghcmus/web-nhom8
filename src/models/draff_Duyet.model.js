const mongoose = require('mongoose');

var draffDuyetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ngayDuyet:Date
});


 mongoose.model('DraffDuyet', draffDuyetSchema);