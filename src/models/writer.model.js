const mongoose = require('mongoose');

var writerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idDraff: [mongoose.Schema.Types.ObjectId]
});


 mongoose.model('Writer', writerSchema);