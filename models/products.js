const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const ProductsSchema = mongoose.Schema({ 
  
  Admin: { 
    type:  Schema.Types.ObjectId, 
    ref: 'Admin' 
   },

   productName: { 
   type: String
   }, 
   
   productDescription : { 
    type: String
   }, 

   productQuantity : { 
   type: Number
   }, 
   
  productImage : { 
   type: String
  },
   
   productCategory: { 
    type: String
   },
   
   productTags : { 
   type: String
   },

   productPrice: {
   type: Number
  }


}); 

module.exports = mongoose.model('Products', ProductsSchema)
