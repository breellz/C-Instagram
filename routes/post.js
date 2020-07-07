const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');
const router = express.Router();

// all posts route
router.get('/allposts', (req, res) => {
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
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: 'All fields are required' });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
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

module.exports = router;
