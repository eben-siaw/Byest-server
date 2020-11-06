const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const OrderSchema = mongoose.Schema({ 
 
 name : { 
 type: String  
 }, 

 admin : { 
  type: Schema.Types.ObjectId, 
  ref: 'Admin'
 }, 

 city: { 
 type: String
 }, 
  
 address: { 
  type: String
 }, 

 locality: { 
  type: String   
 }, 
 
 state : { 
  type: String
 },
 
 phone: { 
 type: Number    
 }

}) 

module.exports = mongoose.model('Order', OrderSchema);