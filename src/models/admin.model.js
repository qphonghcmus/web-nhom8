const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    idUser:Number
});


 mongoose.model('Admin', adminSchema);