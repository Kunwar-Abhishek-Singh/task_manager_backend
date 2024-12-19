const Task = require('../models/Task');


// exports.getAnalytics = async (req, res) => {
//     try {
//       // Example logic to compute task analytics
//       const highPriority = await Task.countDocuments({ priority: 'High' });
//       const mediumPriority = await Task.countDocuments({ priority: 'Medium' });
//       const lowPriority = await Task.countDocuments({ priority: 'Low' });
  
//       const completionRate = {
//         dates: ['2024-12-01', '2024-12-02', '2024-12-03'], // Example dates
//         values: [60, 75, 80], // Example completion rates
//       };
  
//       res.json({
//         taskDistribution: [highPriority, mediumPriority, lowPriority],
//         completionRate,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch analytics', error });
//     }
//   };

const moment = require('moment'); // Optional, for date manipulation

exports.getAnalytics = async (req, res) => {
  try {
    // Example logic to compute task analytics
    const highPriority = await Task.countDocuments({ priority: 'High' });
    const mediumPriority = await Task.countDocuments({ priority: 'Medium' });
    const lowPriority = await Task.countDocuments({ priority: 'Low' });

    // Get the current month and year
    const today = moment().startOf('day'); // Start of today
    const startOfMonth = moment().startOf('month'); // Start of the current month
    const endOfMonth = moment().endOf('month'); // End of the current month

    // Generate an array of dates for the current month
    const daysInMonth = [];
    let currentDay = startOfMonth;

    while (currentDay <= endOfMonth) {
      daysInMonth.push(currentDay.clone()); // Clone to avoid mutation in the loop
      currentDay = currentDay.add(1, 'day');
    }

    const completionRate = {
      dates: [],
      values: [],
    };

    for (const date of daysInMonth) {
      const startOfDay = date.startOf('day').toDate();
      const endOfDay = date.endOf('day').toDate();

      // Total tasks due on this date
      const totalTasks = await Task.countDocuments({
        dueDate: { $gte: startOfDay, $lte: endOfDay },
      });

      // Overdue tasks (tasks that should have been completed by now)
      const overdueTasks = await Task.countDocuments({
        dueDate: { $lt: startOfDay }, // Tasks overdue before this day
      });

      // Completion rate is based on overdue tasks vs. total tasks due in the past period
      const rate = totalTasks > 0 ? ((totalTasks - overdueTasks) / totalTasks) * 100 : 0;

      completionRate.dates.push(date.format('YYYY-MM-DD'));
      completionRate.values.push(rate);
    }

    res.json({
      taskDistribution: [highPriority, mediumPriority, lowPriority],
      completionRate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error });
  }
};
