const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Validate user credentials (userService)
    const user = await userService.validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // 2. Generate JWT token (jwtService)
    const token = jwtService.generateToken({ 
      userId: user._id, 
      email: user.email 
    });
    
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // 1. Create user (userService)
    const user = await userService.createUser({ email, password, name });
    
    // 2. Generate welcome token (jwtService)
    const token = jwtService.generateToken({ 
      userId: user._id, 
      email: user.email 
    });
    
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;