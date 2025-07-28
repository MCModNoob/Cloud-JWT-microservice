const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function connectToDatabase() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose) {
    global.mongoose = {};
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }
  return global.mongoose.conn;
}

module.exports = { connectToDatabase };