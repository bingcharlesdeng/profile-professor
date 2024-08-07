const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/google', async (req, res) => {
  console.log('Google auth request received:', req.body);
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const { name, email } = ticket.getPayload();
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: 'googleauth' });
      await user.save();
    }
    
    const jwtToken = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Authentication failed', details: err.message });
  }
});

module.exports = router;