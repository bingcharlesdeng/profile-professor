const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  facets: [{
    type: {
      type: String,
      required: true,
      enum: ['personality', 'athleticism', 'creativity', 'custom']
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }],
  socialLinks: {
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);