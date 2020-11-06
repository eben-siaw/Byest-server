const express = require("express"); 
const router = express.Router(); 
const cors = require("cors"); 

router.use(cors());

const Products = require("../models/products");

router.post("/addproduct", (req, res) => { 

  const newProducts = new Products(req.body); 

  newProducts.save((error, product) => { 
    if(error) { 
      return res.status(400).json({error: "Failed to save product"})
    }
    return res.status(200).json({message: "Product Submitted Successfully!", product})

  });
   
});  

 //since there are multiple admins, at the admin dashboard we get all products from an Admin only

router.get("/displayProducts/:admin", (req, res, next) => { 

  Products.find({Admin: req.params.admin})
 .populate('Admin')
 .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
      return res.status(200).json({message: "Success", products
      });
    });

}); 
 
// display all products at the Home Page
router.get("/fetchproducts", (req, res, next) => { 

    Products.find({})
   .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }
        return res.status(200).json({message: "Products retrieved successfully", products});
      });
  
  }); 
  

  // fetch single products for customer

  router.get("/singleproduct/:id", (req, res) => { 

    Products.findOne({"_id": req.params.id})  
    .populate('Admin')
    .exec((err, product) => { 
       if(err) { 
        return res.status(400).json({error: "Unable to get single product"}) 
      }
       return res.status(200).json({success: "ProductFound", product})
    })
  })

module.exports = router;

