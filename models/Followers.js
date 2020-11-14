const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowerSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 

    PostId: { 
      type: Schema.Types.ObjectId, 
      ref: 'VideoAds'  
    }

}, { timestamps: true })


module.exports = mongoose.model('Followers', FollowerSchema);
