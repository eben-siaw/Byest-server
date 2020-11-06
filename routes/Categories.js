const express = require("express"); 
const router = express.Router(); 

const Product = require("../models/categories");
 
const cors = require("cors");

router.use(cors());

 //get car category items

router.get("/getCars/:cars", (req, res, next) => { 

    Product.find({productCategory: req.params.cars}) 
    .exec((error, cars) => { 
      if(error) { 
        return res.status(404).json({error: "Process could not be processes"}) 
      } 
      return res.status(200).json({message: "Results found", cars})
    })
}); 
 
  //get outfits category

router.get("/getOutfits/:outfits", (req, res, next) => { 
  
  Product.find({productCategory: req.params.outfits}) 
  .exec((error, outfits) => { 
    if(error) { 
      return res.status(404).json({error: "Process could not be processes"}) 
    } 
    return res.status(200).json({message: "Results found", outfits})
  })
  

}) 

 // get phones category

 router.get("/getPhones/:phones", (req, res, next) => { 

  Product.find({productCategory: req.params.phones}) 
  .exec((error, phones) => { 
    if(error) { 
      return res.status(404).json({error: "Process could not be processes"}) 
    } 
    return res.status(200).json({message: "Results found", phones})
  })
   

});  


// get appliances category

router.get("/getPhones/:phones", (req, res, next) => { 

  Product.find({productCategory: req.params.appliances}) 
  .exec((error, appliances) => { 
    if(error) { 
      return res.status(404).json({error: "Process could not be processes"}) 
    } 
    return res.status(200).json({message: "Results found", appliances})
  })
   

});  

 // get drinks category

 router.get("/getDrinks/:drinks", (req, res, next) => { 

  Product.find({productCategory: req.params.drinks}) 
  .exec((error, drinks) => { 
    if(error) { 
      return res.status(404).json({error: "Process could not be processes"}) 
    } 
    return res.status(200).json({message: "Results found", drinks})
  })
   

}); 

module.exports = router;