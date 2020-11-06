const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const CategorySchema = mongoose.Schema({ 
 
 Admin : { 
  type: Schema.Types.ObjectId, 
  ref: 'Admin'
 },

 categoryName: { 
 type: String
 }

}) 

module.exports = mongoose.model('Categories', CategorySchema);