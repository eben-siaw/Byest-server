const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const VideoAdsSchema = mongoose.Schema({ 

 title: { 
   type: String  
 },
 
 description : { 
 type: String  
 },  

 videoName: { 
   type: String
 }, 

 videoUrl : { 
   type: String
 },

 Admin : { 
  type: Schema.Types.ObjectId, 
  ref: 'Admin'
 },
 
 createdAt: { 
  type: Date,
  default: Date.now
 }

}) 


module.exports = mongoose.model('VideoAds', VideoAdsSchema);