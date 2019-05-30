const mongoose = require('mongoose');

var draffDuyetSchema = new mongoose.Schema({
    idDraff: Number,
    ngayDuyet:Date
});


 mongoose.model('DraffDuyet', draffDuyetSchema);