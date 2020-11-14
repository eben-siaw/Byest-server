const mongoose =  require("mongoose"); 
const Schema = mongoose.Schema; 

const ViewsSchema = mongoose.Schema({ 

PostId: { 
 type: Schema.Types.ObjectId,
 ref: 'VideoAds'    
}, 

userTo : { 
 type: Schema.Types.ObjectId, 
 ref: 'Admin'
}, 

userFrom: { 
 type: Schema.Types.ObjectId, 
 ref: 'User'   
}, 

updateViews: { 
 type: Boolean, 
 default: false
}

}); 

module.exports = mongoose.model('Views', ViewsSchema);