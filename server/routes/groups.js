const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const User = require('../models/User');
const paginatedResults = require('../middleware/pagination');

router.post('/', [
  auth,
  body('name').trim().isLength({ min: 3 }).escape(),
  body('description').trim().isLength({ min: 10 }).escape()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {
    let group = await Group.findOne({ name });
    if (group) {
      return res.status(400).json({ msg: 'Group already exists' });
    }

    group = new Group({
      name,
      description,
      creator: req.user.id,
      members: [req.user.id]
    });

    await group.save();
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.get('/', paginatedResults(Group), async (req, res) => {
  res.json(res.paginatedResults);
});

router.get('/:id', async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', ['name', 'email']);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/join', auth, async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ msg: 'User already in the group' });
    }

    group.members.push(req.user.id);
    await group.save();

    res.json(group);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/leave', auth, async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    const removeIndex = group.members.indexOf(req.user.id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'User not in the group' });
    }

    group.members.splice(removeIndex, 1);
    await group.save();

    res.json(group);
  } catch (err) {
    next(err);
  }
});

module.exports = router;