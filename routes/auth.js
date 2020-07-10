const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

const User = mongoose.model('User');
const router = express.Router();

// user sign up route
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
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
            password: hashedPassword
          });
          user.save()
            .then((user) => {
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
            const {_id, username, email, followers, following } = savedUser;
            res.json({ token, user:{_id, username, email,followers, following }, message: 'Login successful'} );
          }
          return res.status(422).json({ error: 'invalid username or password' });
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

module.exports = router;
