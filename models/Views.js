const mongoose =  require("mongoose"); 
const Schema = mongoose.Schema; 

const ViewsSchema = mongoose.Schema({ 

postId: { 
 type: Schema.Types.ObjectId,
 ref: 'VideoAds'    
}, 

views: { 
 type: Number, 
 defaultValue: 0   
}


}) 

module.exports = mongoose.model('Views', ViewsSchema);