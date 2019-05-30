const mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    idUser:Number,
    thoiHan: Date
});


 mongoose.model('Subscriber', subscriberSchema);