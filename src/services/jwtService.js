const jwt = require('jsonwebtoken');

class JwtService {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: '24h' 
    });
  }
  
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  
  generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_SECRET, { 
      expiresIn: '7d' 
    });
  }
}

module.exports = new JwtService();