const mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    thoiHan: Date
});


 mongoose.model('Subscriber', subscriberSchema);