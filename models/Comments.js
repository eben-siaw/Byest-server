const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({ 

 user: { 
 type: Schema.Types.ObjectId, 
 ref: 'User'
 }, 

 responseTo: { 
  type: Schema.Types.ObjectId, 
  ref: 'User'
 },
 
 postId : { 
  type: Schema.Types.ObjectId    
 },

 message: { 
   type: String  
 }

}) 

module.exports = mongoose.model('Comments', CommentSchema);