const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id); // Find task by ID
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json(task); // Send task data as response
    } catch (error) {
      console.error("Error fetching task:", error);
      return res.status(500).json({ message: 'Server error while fetching task' });
    }
  };

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    console.log("newTask is: ", newTask)
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};



// Update Task
exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params; // Get task ID from URL parameters
      const { title, description, dueDate, priority } = req.body; // Get updated task data from the request body
  
      // Validate input (you can add more validation as necessary)
      if (!title || !description || !dueDate || !priority) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Find the task by ID and update it
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, dueDate, priority },
        { new: true } // `new: true` returns the updated document
      );
  
      // If task not found
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Respond with the updated task
      return res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ message: 'Server error while updating task' });
    }
  };

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};


  


