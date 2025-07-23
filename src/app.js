const { connectToDatabase } = require('./connection.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const protectedRoutes = require('./routes/protected');

const app = express();

connectToDatabase().then((db) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api', healthRoutes);
  app.use('/api/protected', protectedRoutes);

  app.use((error, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
  });

});
module.exports = app;