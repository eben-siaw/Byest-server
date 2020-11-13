const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   }, 

   userTo : { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   videoId: {
       type: Schema.Types.ObjectId,
       ref: 'Video'
   }

}, { timestamps: true })


module.exports = mongoose.model('Like', likeSchema);
