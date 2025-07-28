const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userService = require('../services/userService');

// All routes in this file require authentication
router.use(authMiddleware);

router.get('/profile', async (req, res) => {
  try {
    // req.user comes from authMiddleware
    const user = await userService.getUserById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;