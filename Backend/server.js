const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Aacharya Backend is running! 🚀',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected (check MongoDB)',
    endpoints: ['/api/auth', '/api/users', '/api/missions', '/api/chat', '/health']
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/missions', require('./routes/missions'));
app.use('/api/chat', require('./routes/chat'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Connect to MongoDB in the background
  console.log('⏳ Connecting to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aacharya')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️ Running in limited mode (DB features disabled)');
  });
});