const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');
const User = mongoose.model('User')
const router = express.Router();

router.get('/user/:id',requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
  .select('-password')
  .then((user) => {
      Post.find({postedBy: req.params.id})
      .populate('postedby', '_id, name')
      .exec((err, posts) => {
        if (err) {
          return res.status(422).json({error: err})
        }
        return res.json({user, posts})
      })
  }).catch((err) => {
    res.status(404).json({error: 'user not found'})
  })
})

module.exports = router;
