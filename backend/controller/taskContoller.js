/**
 * @api {get} /api/v1/tasks Get All Tasks
 * @apiName GetTasks
 * @apiGroup Tasks
 * @apiSuccess {Object[]} tasks List of tasks.
 * @apiError {String} message Error message.
 * @apiError {String} error Detailed error message.
 */

/**
 * @api {get} /api/v1/tasks/:id Get Single Task
 * @apiName GetSingleTask
 * @apiGroup Tasks
 * @apiParam {String} id Task's unique ID.
 * @apiSuccess {Object} task Task object.
 * @apiError {String} message Task not found.
 * @apiError {String} error Detailed error message.
 */

/**
 * @api {post} /api/v1/tasks Create New Task
 * @apiName CreateTask
 * @apiGroup Tasks
 * @apiParam {String} name Name of the task.
 * @apiSuccess {Object} task Created task object.
 * @apiError {String} message Error creating task.
 * @apiError {String} error Detailed error message.
 */

/**
 * @api {patch} /api/v1/tasks/:id Update Task
 * @apiName UpdateTask
 * @apiGroup Tasks
 * @apiParam {String} id Task's unique ID.
 * @apiParam {String} name Name of the task.
 * @apiParam {Boolean} completed Completion status of the task.
 * @apiSuccess {Object} task Updated task object.
 * @apiError {String} message Task not found.
 * @apiError {String} error Detailed error message.
 */

/**
 * @api {delete} /api/v1/tasks/:id Delete Task
 * @apiName DeleteTask
 * @apiGroup Tasks
 * @apiParam {String} id Task's unique ID.
 * @apiSuccess {String} message Task deleted successfully.
 * @apiError {String} message Task not found.
 * @apiError {String} error Detailed error message.
 */

import Task from '../model/taskModel.js';
import mongoose from 'mongoose';

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// Get a single task
export const getSingleTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    const { name } = req.body;
    const task = new Task({ name, _id: new mongoose.Types.ObjectId() });
    try {
        const savedTask = await task.save();
        return res.status(201).json({ task: savedTask });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;

    try {
        const updates = { name, completed };
        const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};
