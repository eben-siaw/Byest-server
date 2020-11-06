const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const Customers = require('../models/Customers')

/* const {SENDGRID_API, EMAIL} = require('../config/keys') 
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
})) */ 

 const cors = require("cors");

 router.use(cors());

router.post('/addCustomer',(req,res) =>{ 

  Customers.findOne({email: req.body.email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }   
       else { 

      bcrypt.genSalt(10, (err, salt) => {   
      
        const user = new Customers(req.body);

        bcrypt.hash(user.password, salt, (err, hash) => { 
     
            if(err) throw err;
              user.password = hash;
                 user.save()
                 .then(user=>{
                  /*   transporter.sendMail({
                         to:user.email,
                        from:"info.mekexpress@gmail.com",
                        subject:"Welcome from Mekexpress.",
                        html:"<h1>You have signed up as a customer. Find products which will interest you.</h1>"
                     })*/
                   return res.status(200).json({message:"saved successfully", user})
                 })
                 .catch(error =>{
                     res.json({error: "Unable to register"});
                })
            })
        })    
      }
   })
  .catch(err=> {
    console.log(err)
  }) 

})


router.post('/login',(req,res)=>{ 

    const {email, password} = req.body; 

    if(!email || !password){ 
       return res.status(422).json({error:"please add email or password"})
    }
    Customers.findOne({email:email})
    .then(savedUser=>{ 

        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password, savedUser.password) 
        .then(doMatch=>{ 

            if(doMatch){
                
                const payload = { 
                    _id: savedUser._id, 
                    full_name: savedUser.fullName, 
                    email: savedUser.email, 
                    phone: savedUser.Phone
                }

               const token = jwt.sign(payload, process.env.jwtSecret, { 
                   expiresIn: 14440
               })
           
               res.json({token, savedUser})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


router.post('/reset-password',(req,res) => { 

     crypto.randomBytes(32,(err,buffer)=>{
         if(err){
             console.log(err)
         }
         const token = buffer.toString("hex")
         Customers.findOne({email:req.body.email})
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
    Customers.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
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


module.exports = router;