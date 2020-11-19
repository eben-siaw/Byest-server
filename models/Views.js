const mongoose =  require("mongoose"); 
const Schema = mongoose.Schema; 

const ViewsSchema = mongoose.Schema({ 

PostId: { 
 type: Schema.Types.ObjectId,
 ref: 'VideoAds'    
}, 

userFrom: { 
 type: Schema.Types.ObjectId,    
}, 

updateViews: { 
 type: Boolean, 
 default: false
}

}); 

module.exports = mongoose.model('Views', ViewsSchema);