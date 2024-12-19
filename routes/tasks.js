const express = require('express');
const { getTasks,getTaskById, createTask, updateTask, deleteTask, getAnalytics } = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);          // Get all tasks
router.get('/:id', getTaskById);    // Get a single task by ID
router.post('/', createTask);       // Create a new task
router.put('/:id', updateTask);     // Update a task
router.delete('/:id', deleteTask);  // Delete a task

// Analytics route
// router.get('/analytics', getAnalytics); // Get task analytics

module.exports = router;
