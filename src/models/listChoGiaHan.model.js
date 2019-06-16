const mongoose = require('mongoose');

var listChoGiaHanSchema = new Mongoose.Schema({
    idUser:Number,
    ngayMuonGiaHan: String
});
mongoose.model('ListChoGiaHan', listChoGiaHanSchema);