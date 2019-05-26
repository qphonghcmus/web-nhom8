const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
});


 mongoose.model('Admin', adminSchema);