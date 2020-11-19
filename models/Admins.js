const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const AdminSchema = mongoose.Schema({ 

  firstName : { 
   type: String
  }, 

  lastName : { 
  type: String
  },
  
  email : { 
  type: String, 
  required: true
  }, 
  
  resetToken: String,  
  
  expireToken: String,

  phone : { 
  type: Number
  },
  
  address: { 
  type: String
  }, 

  password: { 
  type: String
  }


}) 

module.exports =  mongoose.model('Admin', AdminSchema);