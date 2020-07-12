const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL, PASS } = require('../config/keys');

const User = mongoose.model('User');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth : {
    user: EMAIL,
    pass: PASS
  }
})
// user sign up route
router.post('/signup', (req, res) => {
  const { username, email, password, profilePicture } = req.body;
  if (!username || !email || !password) {
    return res.status(422).json({ error: 'All fields are required' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'user already exists with that email' });
      }
      bcrypt.hash(password, 15)
        .then((hashedPassword) => {
          const user = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture
          });
          user.save()
            .then((user) => {
              const message = {
                to: user.email,
                from: 'barseet96@gmail.com',
                subject: 'Registration successful',
                html: `<div>
                      <h1>Welcome to Cinstagram</h1>
                      <h4>here are your login details</h4>
                      <h5>username:</h5> ${user.username}
                     <h5>password:</h5>  ${password}
                      <h5>Email:</h5> ${user.email}
                      <p>Have fun</p>
                      </div>`
              }
                transporter.sendMail(message,(err, info) => {
                  if(err) {
                    console.log(err)
                  } else {
                    console.log('email sent', info)
                  }
                })
              res.json({ message: 'Registration successful' });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// user sign in route
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'email or password not provided' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'invalid username or password' });
      }
      bcrypt.compare(password, savedUser.password)
        .then((match) => {
          if (match) {
            // return res.json({ message: 'successfully signed in' });
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const {_id, username, email, followers, following, profilePicture } = savedUser;
            res.json({ token, user:{_id, username, email,followers, following, profilePicture }, message: 'Login successful'} );
          }
          return res.status(422).json({ error: 'invalid username or password' });
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

// password reset

router.post('/resetpassword', (req, res)=> {
  crypto.randomBytes(32, (err, Buffer) => {
    if (err) {
      console.log(err)
    } else {
      const token = Buffer.toString('hex')
      User.findOne({email: req.body.email})
      .then((user) => {
        if(!user) {
          return res.status(422).json({ error: 'No user exists with that email address' })
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: EMAIL,
            subject: 'Password reset',
            html: `
            <p>You requested a password reset</p>
            <h5>Click this <a href="https://localhost:3000/reset/${token}">link</> to reset</h5>
            `
          })
        })
        res.json({message: 'Password reset instructions have been sent to your email address'})
      })
    }
  })
})

// update password
router.post('/newpassword',(req,res)=>{
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
             res.json({message:"password updated successfully"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})
module.exports = router;
