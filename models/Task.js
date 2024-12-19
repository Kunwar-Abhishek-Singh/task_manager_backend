


const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'], // Example of allowed values
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


