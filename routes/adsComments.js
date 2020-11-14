const express = require('express');
const router = express.Router(); 
const cors = require("cors");

const Comment = require("../models/Comments");

router.use(cors())

router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, result) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': result._id })
            .populate('user')
            .exec((err, result) => {
                if (err) return res.status(400).json({err: "Failed to save comment" });

                return res.status(200).json({ success: "Comment saved!", result})
            })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ "PostId": req.body.videoId })
        .populate('user')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
    })

});




module.exports = router;

