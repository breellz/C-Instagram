const mongoose = require('mongoose');

const{ ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profilePicture:{
    type:String,
    default: 'https://res.cloudinary.com/breellz/image/upload/v1594400448/287-2876223_no-profile-picture-available-hd-png-download_dbghxv.jpg'
  },
  password: {
    type: String,
    required: true
  },
  followers:[{type: ObjectId, ref:'User'}],
  following:[{type: ObjectId, ref:'User'}]
});

mongoose.model('User', userSchema);
