const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/tasks');
const { getAnalytics } = require('./controllers/analyticsController');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/analytics', getAnalytics)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
