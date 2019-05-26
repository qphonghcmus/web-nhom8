const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Newspaper', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./category.model');
require('./post.model');
require('./postDetail.model');
require('./admin.model');
require('./comment.model');
require('./draff_Duyet.model');
require('./draff.model');
require('./draffTuChoi.model');
require('./editor.model');
require('./subscriber.model');
require('./writer.model');
require('./tag.model');
require('./user.model');