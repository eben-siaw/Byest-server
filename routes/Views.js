const express = require("express")
const cors = require("cors");
const router = express.Router();

const Views = require("../models/Views"); 

// update video views count for a video
router.post("/count", (req, res) => { 
 
    const view = new Views({ 
     postId: req.body.videoId,  
     views: +1
    });

     view.save()
     .then(count => { 
      return res.json({success: "view counted!", count})
    }) 
    .catch(error => { 
     res.json({error: "Failed to count view"})
    })
    
});  


router.get('/getViews/:videoId', (req, res) => { 

    Views.find({videoId: req.params.videoId})
    .then(views => { 
       return res.status(200).json({success: true, views})
    })
    .catch(error => { 
       res.json(error);
    })

}) 

module.exports = router;