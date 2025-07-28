const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserService {
  async validateCredentials(email, password) {
    const user = await User.findOne({ email });
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
  
  async createUser({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    return await user.save();
  }
  
  async getUserById(userId) {
    return await User.findById(userId).select('-password');
  }
}

module.exports = new UserService();