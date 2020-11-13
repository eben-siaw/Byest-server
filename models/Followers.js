const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowerSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


module.exports = mongoose.model('Followers', FollowerSchema);
