const mongoose = require('mongoose');

 /*mongoose.connect('mongodb://localhost:27017/Newspaper', { useNewUrlParser: true }, (err) => {
     if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
 });*/

mongoose.connect(require('../config/mongoKey').mongoURI, { useNewUrlParser: true })
    .then( () => console.log('MongoDB connected'))
    .catch( err => console.log('Error in DB connection' + err))
    
require('./category.model');
require('./post.model');
require('./postDetail.model');
require('./admin.model');
require('./comment.model');
require('./draft_Duyet.model');
require('./draft.model');
require('./draftTuChoi.model');
require('./editor.model');
require('./subscriber.model');
require('./writer.model');
require('./tag.model');
require('./user.model');