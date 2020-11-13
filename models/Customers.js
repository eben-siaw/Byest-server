const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const CustomerSchema = mongoose.Schema({ 

 fullName : { 
  type: String
 }, 

 email : { 
  type: String
 }, 

 Phone : { 
 type: String
 },

 address: { 
  type: String
 },

password: { 
 type: String
}

},{timestamp: true}); 

module.exports = mongoose.model('User', CustomerSchema)

