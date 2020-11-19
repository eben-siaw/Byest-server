const express = require("express"); 
const router = express.Router()
const cors = require("cors"); 

router.use(cors()); 

const Videos = require("../models/Videos");

router.post("/saveVideoAds", (req, res, next) => { 
 
    const newAds = Videos(req.body); 

    newAds.save((error, videos) => { 
    if(error) { 
       return res.status(400).json({error: "Failed to submit ad"}); 
    } 
    return res.status(200).json({message: "Ad submitted successfully", videos}) 
  });
    
}) 

// get admin ads
router.get("/getVideoAds/:admin", (req, res) => { 

    Videos.find({Admin: req.params.admin})
    .populate('Admin')
    .exec((error, videos) => {
         if (error) {
           return res.status(400).json({
             error: 'Your request could not be processed. Please try again.'
           });
         }
         return res.status(200).json({message: "Success", videos});
    });

}) 
 
// remove a video
router.delete("/removeVideo/:id", (req, res) => { 

  Videos.findOneAndDelete({ "_id": req.params.id })  
       .then(video => {
         res.json(video);
     })
     .catch(error => {
         res.json({ error });
     });  
     
}) 

 // get all ads
router.get("/getVideoAds", (req, res) => { 

    Videos.find({})
    .populate('Admin')
    .exec((error, videos) => {
         if (error) {
           return res.status(400).json({
             error: 'Your request could not be processed. Please try again.'
           });
         }
         return res.status(200).json({success: "true", videos});
    });

})
  

 // get ad 
 router.post("/playAd", (req, res) => { 

  Videos.findOne({ "_id" : req.body.videoId })
  .populate('Admin')
  .exec((err, video) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: "Video is Playing", video })
  })

 })

 

module.exports = router;