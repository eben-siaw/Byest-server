const express = require('express');
const router = express.Router();
const cors = require("cors");

const Follower = require("../models/Followers");

router.use(cors());

//Followers and following 

// followers number of a post
router.post("/followers", (req, res) => {

    Follower.find({ "PostId": req.body.PostId })
    .exec((err, follow) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({ success: true, followers: follow.length})
    })

});



router.post("/following", (req, res) => {

    Follower.find({ "PostId": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, follow) => {
        if(err) return res.status(400).send(err)

        let result = false; 

        if(follow.length !== 0) {
            result = true
        }

        return res.status(200).json({ success: true, following: result })
    })

});



router.post("/Follow", (req, res) => {

    const newfollower = new Follower(req.body);

    newfollower.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, doc })
    })

});


router.post("/unfollow", (req, res) => {

    console.log(req.body)

    Follower.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});



module.exports = router;
