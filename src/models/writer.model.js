const mongoose = require('mongoose');

var writerSchema = new mongoose.Schema({
    idUser:Number,
    idDraff: [Number],
    butDanh: String
});

 const writer = mongoose.model('writers', writerSchema);

 module.exports = {
    add: entity => {
        return new Promise((resolve, reject) => {
            
            var obj = new writer({
                hoTen: entity.hoTen,
                idUser:entity.idUser,
                idDraff: entity.idDraff,
                butDanh: entity.butDanh
            })
            obj.save((err, res) => {
                if (err) reject(err)
                else resolve(res.idUser)
            })
        })
    },

    updateProfile: (entity, id) => {
        return new Promise((resolve, reject) => {
            writer.findOneAndUpdate({ idUser: id }, entity, { new: true }).exec((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    },

}