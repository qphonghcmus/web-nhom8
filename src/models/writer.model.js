const mongoose = require('mongoose');

var writerSchema = new mongoose.Schema({
    idUser:Number,
    idDraff: [Number]
});


 mongoose.model('Writer', writerSchema);