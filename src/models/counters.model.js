const mongoose = require('mongoose');

var countersSchema = new mongoose.Schema({
    id: String,
    seq: Number,
});



module.exports = {
    findById: id => {
        return new Promise((resolve, reject) => {
            var counters = mongoose.model('counters',countersSchema);
            counters.find({id: id}).exec((err,res) => {
                if(err) reject(err);
                else    resolve(res);
            })
        })
    }
}