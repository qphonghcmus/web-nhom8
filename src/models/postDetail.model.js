const mongoose = require('mongoose');

var postDetailSchema = new mongoose.Schema({
    _id: {
      type:  mongoose.Schema.Types.ObjectId
    },
    noiDung:String
});


 mongoose.model('PostDetail', postDetailSchema);