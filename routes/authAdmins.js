const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const Admin = require("../models/Admins");

 const cors = require("cors");

 router.use(cors());

/* 
  const {SENDGRID_API,EMAIL} = require('../config/keys')
 const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))*/

router.post('/register', (req, res) => { 
 
    Admin.findOne({ email: req.body.email }) 
	.then(user => {
		if (user) {
			return res.json({error: "email already exists" });
		} else {
			const newUser = new Admin(req.body);

			bcrypt.genSalt(10, (err, salt) => { 

				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(error => res.json({error: "Unable to register!"}) );
				});
			});
		}
	});
  

})


router.post('/login', (req,res) => { 

    const {email, password} = req.body; 

    if(!email || !password){ 
       return res.json({error:"please add email or password"})
    }
    Admin.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{ 

            if(doMatch){
                 
            const payload = { 
             _id: savedUser._id, 
             first_name: savedUser.firstName, 
             last_name: savedUser.lastName, 
             email: savedUser.email, 
             address: savedUser.address
            }

            let token = jwt.sign(payload, process.env.jwtSecret, { 
                expiresIn: 31556926
            }); 
            
              res.send(token)

              return res.status(200).json({token, savedUser})
            }
            else{
                return res.json({error:"Invalid email or password"})
            }
        })
        .catch(error=>{
            res.json({error: "User not found!"})
        })
    })
})


router.post('/reset-password',(req,res) => { 

     crypto.randomBytes(32,(err,buffer)=>{
         if(err){
             console.log(err)
         }
         const token = buffer.toString("hex")
         User.findOne({email:req.body.email})
         .then(user=>{
             if(!user){
                 return res.status(422).json({error:"User dont exists with that email"})
             }
             user.resetToken = token
             user.expireToken = Date.now() + 3600000
             user.save().then((result)=>{
                 transporter.sendMail({
                     to:user.email,
                     from:"no-replay@insta.com",
                     subject:"password reset",
                     html:`
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                     `
                 })
                 res.json({message:"check your email"})
             })

         })
     })
})


router.post('/new-password',(req,res)=> {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router