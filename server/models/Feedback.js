const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  giver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  ratings: {
    personality: { type: Number, min: 1, max: 5, required: true },
    athleticism: { type: Number, min: 1, max: 5, required: true },
    creativity: { type: Number, min: 1, max: 5, required: true },
    integrity: { type: Number, min: 1, max: 5, required: true },
    diligence: { type: Number, min: 1, max: 5, required: true }
  },
  constructiveFeedback: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  isAIEnhanced: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);