const express = require("express"); 
const app = express();  
const port =   process.env.PORT || 5080;
const bodyparser = require("body-parser"); 
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config(); 

//middleware
app.use(cors());  
app.use(express.json())
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended: true}));


const config = 'mongodb://localhost:27017/mekbase'

//const cloud = process.env.mongoURI;

const connect = mongoose.connect(config, {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser:true})
.then(() => console.log("Mongo is Connected...")) 
.catch(err => console.log(err));

const Admin = require("./routes/authAdmins"); 
const Customers = require("./routes/authCustomers"); 
const Products = require("./routes/Products");   
const VideoAds = require("./routes/VideoAds")
const Categories = require("./routes/Categories");
const Orders = require("./routes/Orders");
const Views = require("./routes/Views");
const Comments = require("./routes/adsComments");
const Likes = require("./routes/adsLikesDisLikes"); 
const Followers = require("./routes/adsFollowers");

app.use("/admins", Admin); 
app.use("/customers", Customers); 
app.use("/products", Products);  
app.use("/video", VideoAds);  
app.use("/like", Likes) 
app.use("/comment", Comments)
app.use("/follow", Followers)
app.use("/views", Views);
app.use("/orders", Orders); 
app.use("/categories", Categories);

app.listen(port, function() { 
console.log('Server is listening on: ' + port) });