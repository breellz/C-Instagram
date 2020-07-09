const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');
const router = express.Router();

// all posts route
router.get('/allposts', requireLogin, (req, res) => {
  Post.find({})
    .populate('postedBy', '_id username')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create post route
router.post('/create', requireLogin, (req, res) => {
  const { title, body, photo } = req.body;
  if (!title || !body || !photo) {
    return res.status(422).json({ error: 'All fields are required' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo,
    postedBy: req.user
  });
  post.save().then((savedpost) => {
    res.json({ post: savedpost });
  })
    .catch((err) => {
      console.log(err);
    });
});

// user posts route
router.get('/myposts', requireLogin, (req, res) => {
  /* eslint no-underscore-dangle: 0 */
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', 'id username')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post like route

router.put('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { likes:req.user._id }},
    {
      new:true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    res.json(result)
  })
})

// post unlike route

router.put('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes:req.user._id }},
    {
      new:true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    res.json(result)
  })
})

module.exports = router;
