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

// follow
router.put('/follow',requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.followId,{
    $push:{followers: req.user._id}
  },{
    new: true
  },(error, result)=>{
    if (error) {
      return res.status(422).json({error})
    }
    User.findByIdAndUpdate(req.user._id,{
      $push:{following: req.body.followId}
    },{
      new: true
    }).select('-password').then((result)=> {
      res.json(result)
    }).catch((error) => {
      res.status(422).json({error})
    })
  })
})

//unfolow

router.put('/unfollow',requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId,{
    $pull:{followers: req.user._id}
  },{
    new: true
  },(error, result)=>{
    if (error) {
      return res.status(422).json({error})
    }
    User.findByIdAndUpdate(req.user._id,{
      $pull:{following: req.body.unfollowId}
    },{
      new: true
    }).select('-password').then((result)=> {
      res.json(result)
    }).catch((error) => {
      res.status(422).json({error})
    })
  })
})

// upodate profile picture

router.put('/updatepic',requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.user._id, {$set:{profilePicture: req.body.pic}},{new:true},(err, result) => {
    if(err) {
      return res.status(422).json({error: 'picture cannot be updated'})
    }
    res.json(result)
  })
})

module.exports = router;
