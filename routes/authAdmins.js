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


 const {SENDGRID_API, main_url} = require('../config/keys.js'); 
 
 const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: SENDGRID_API
    }
}));

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
                        .then(user => {    
                            transporter.sendMail({
                            to:user.email,
                            from:"edei-siaw@st.ug.edu.gh",
                            subject:"Welcome to Mekexpress",
                            html:"<p>Start by posting products or video ads. An admin account allows you to check orders received from your posted products and also manage ads you upload. Welcome once again.</p>"
                        })
                            res.json({message: "Admin created successfully!", user}) 
                        })
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
             address: savedUser.address, 
             phone: savedUser.phone
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

     crypto.randomBytes(32,(err, buffer)=>{
         if(err){
             console.log(err)
         }
         const token = buffer.toString("hex");

         Admin.findOne({email: req.body.email})
         .then(user=>{
             if(!user){
                 return res.json({error:"User with this email does not exists!"})
             }
             user.resetToken = token
             user.expireToken = Date.now() + 3600000
             user.save() 
             .then((result)=>{
                 transporter.sendMail({
                     to:user.email,
                     from:"edei-siaw@st.ug.edu.gh",
                     subject:"Mekexpress - Password Reset",
                     html:`
                     <p>You requested for a password reset</p>
                     <h5>click on this <a href="${main_url}/admin/reset-pass/${token}">link</a> to change your password</h5>
                     <p>info.mekexpress@gmail.com</p>`
                   })
                 res.json({message:"check your email"});
             })

         })
     })
})

router.post('/new-password', (req, res)=> {
    const newPassword = req.body.password; 

    const password2 = req.body.password2;

    if(newPassword !== password2) { 
       res.json({error: "Passwords do not match. Check again!"});  
    }
    const sentToken = req.body.token; 

    Admin.findOne({resetToken: sentToken, expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.json({error: "Try again session expired"})
        } 

        bcrypt.hash(newPassword, 12).then(hashedpassword => { 

           user.password = hashedpassword; 

           user.resetToken = undefined 

           user.expireToken = undefined 

           user.save() 
           .then((saveduser)=>{
               res.json({message:"Your Password has been updated successfully"})
           })
        })
    }).catch(err=>{
       res.json({err: "Failed to reset password!"})
    })
})


module.exports = router;