const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db/conn');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed
  credentials: true, // Allow cookies to be sent with requests
}));
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);
app.use('/categories', categoryRouter);
app.get('/', (req, res) => {
  res.send('✅ Todo API is up and running!');
});

const PORT = process.env.PORT || 3000;

connectDB() // 👉 Call once, before starting the server
  .then(() => {
    app.listen(PORT, () => {
        console.log('Connected to:', mongoose.connection.name);
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
