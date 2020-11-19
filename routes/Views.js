const express = require("express")
const cors = require("cors");
const router = express.Router();

router.use(cors());

const Views = require("../models/Views"); 
 
// add a views count
router.post("/count", (req, res) => {

    let variable = {} 
    
    if (req.body.videoId) {
    variable = { PostId: req.body.videoId, userFrom: req.body.userFrom, updateViews: true }
    } 

    const view = new Views(variable)
    //save the views information data in MongoDB
    view.save((err, result) => {
        if (err)  return res.json({ error: "Failed to save view!"});           
        return res.status(200).json({success: "view counted", result})
    })

})

  // get number of views for a video
router.get("/getViews/:videoId", (req, res) => {

    let variable = {} 

    if (req.params.videoId) {
        variable = { PostId: req.params.videoId }
    } 

    Views.find(variable) 
        .populate("PostId")
        .exec((err, views) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, views}) 

    })


})

module.exports = router;