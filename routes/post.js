const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');
const router = express.Router();

// all posts route
router.get('/allposts', requireLogin, (req, res) => {
  Post.find({})
    .populate('postedBy', '_id username')
    .populate('comments.postedBy', '_id username')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

// all users I follow posts route
router.get('/followposts', requireLogin, (req, res) => {
  // if any of the ids in folowing is present in any of any post's postedby(id) fetch it
  Post.find({postedBy: { $in: req.user.following }})
    .populate('postedBy', '_id username')
    .populate('comments.postedBy', '_id username')
    .sort('-createdAt')
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
// comment delete route

router.put('/deleteComment/:commentId', requireLogin, (req, res) => {
  Post.findOne({_id: req.body.postId})
  .populate('comments.postedBy', '_id')
  .exec((err, post) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    const matchComment = post.comments.filter((comment)=> comment._id.toString() !== req.params.commentId.toString())
    let index = post.comments.indexOf(matchComment)
    post.comments.splice(index, 1)
    post.save().then((post)=>{
      console.log(post)
      res.json(post)
    }).catch((err) => {
      console.log(err)
    })
   
})
})
//post delete route

router.delete('/delete/:postId',requireLogin, (req, res) => {
  Post.findOne({_id: req.params.postId})
  .populate('postedBy','_id')
  .exec((err, post) => {
    if (err || !post) {
      return res.status(422).json({ error: err })
    }
    if (post.postedBy._id.toString() === req.user._id.toString()) {
      post.remove()
      .then((deleted)=> {
        res.json(deleted)
      }).catch((err) => {
        console.log(err)
      })
    }
  })
})

//comment route

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user
  }
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { comments:comment }},
    {
      new:true
  })
  .populate('comments.postedBy', '_id, username')
  .populate('postedBy', '_id username')
  .exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    res.json(result)
  })
})

module.exports = router;
