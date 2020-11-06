const express = require("express"); 
const router = express.Router(); 
const Orders = require("../models/Orders"); 

 const cors = require("cors");

 router.use(cors());
 // when a customer makes proceeds to check out after adding to cart 

router.post("/requestOrder", (req, res) => { 
    
    try {
    //    const cart = req.body.cartId;
        const address = req.body.address; 
        const phone = req.body.phone;
        const locality = req.body.locality;
        const state = req.body.state;
        const name = req.body.name;
        const admin = req.body.admin;
        const city = req.body.city;
    
        const newOrder = new Orders({
          city, 
          admin, 
          address,  
          state, 
          phone,
          name,
          locality
        });
    
        newOrder.save()
        .exec((err, order) => { 
          if(err) { 
            return res.status(400).json({error : "Your request could not be processed"}); 
          } 
          return res.status(200).json({message: "You have successfully placed an order!", order})
        })
    
        newOrder.find({}).then(order => { 
         res.json(order);
       })
      } catch (error) { 
        res.json({error})
    }

});
 
  // find any orders received by admin from customer interested in his products
 router.get("/getOrders/:admin", (req, res) => { 

   Orders.find({admin: req.params.admin}) 
   .populate('admin') 
   .exec((err, orders) => { 
     if(err) { 
       return res.status(404).json({error: "No orders found!"})
     } 
     return res.status(200).json({message: "Your request has been processed", orders})
  })

}); 
 

module.exports = router;