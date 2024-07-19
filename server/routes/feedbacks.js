const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Feedback = require('../models/Feedback');
const User = require('../models/User');
const Group = require('../models/Group');
const { enhanceFeedback } = require('../services/aiService');

router.post('/', auth, async (req, res) => {
  const { receiverId, ratings, constructiveFeedback, groupId, isAnonymous, shouldEnhance } = req.body;

  try {
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (groupId) {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ msg: 'Group not found' });
      }
      if (!group.members.includes(req.user.id) || !group.members.includes(receiverId)) {
        return res.status(400).json({ msg: 'Both users must be members of the group' });
      }
    }

    let enhancedFeedback = constructiveFeedback;
    if (shouldEnhance) {
      enhancedFeedback = await enhanceFeedback(constructiveFeedback);
    }

    const newFeedback = new Feedback({
      giver: isAnonymous ? null : req.user.id,
      receiver: receiverId,
      group: groupId,
      ratings,
      constructiveFeedback: enhancedFeedback,
      isAnonymous,
      isAIEnhanced: shouldEnhance
    });

    const feedback = await newFeedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/received', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({ receiver: req.user.id })
      .populate('giver', ['name', 'email'])
      .populate('group', ['name'])
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/given', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({ giver: req.user.id })
      .populate('receiver', ['name', 'email'])
      .populate('group', ['name'])
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/analysis', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find({ receiver: req.user.id });
    
    const analysis = {
      averageRatings: {
        overall: 0,
        personality: 0,
        athleticism: 0,
        creativity: 0,
        integrity: 0,
        diligence: 0
      },
      totalFeedback: feedback.length,
      positiveCount: 0,
      negativeCount: 0,
      neutralCount: 0
    };

    feedback.forEach(f => {
      Object.keys(f.ratings).forEach(key => {
        analysis.averageRatings[key] += f.ratings[key];
      });
      
      const averageRating = Object.values(f.ratings).reduce((a, b) => a + b) / Object.values(f.ratings).length;
      if (averageRating > 3.5) analysis.positiveCount++;
      else if (averageRating < 2.5) analysis.negativeCount++;
      else analysis.neutralCount++;
    });

    if (feedback.length > 0) {
      Object.keys(analysis.averageRatings).forEach(key => {
        analysis.averageRatings[key] = analysis.averageRatings[key] / feedback.length;
      });
    }

    res.json(analysis);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/group/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ msg: 'User is not a member of this group' });
    }

    const feedback = await Feedback.find({ group: req.params.groupId })
      .populate('giver', ['name', 'email'])
      .populate('receiver', ['name', 'email'])
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;