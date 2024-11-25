import { Router } from "express";
import { body, param, validationResult } from "express-validator";

const router = Router();
import * as taskController from "../controller/taskContoller.js";

// Validation middleware
const validateTaskCreation = [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string.'),
];

const validateTaskUpdate = [
    param('id').isMongoId().withMessage('Invalid task ID.'),
    body('name').optional().isString().withMessage('Name must be a string.'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean value.'),
];

const validateTaskId = [
    param('id').isMongoId().withMessage('Invalid task ID.'),
];

// Route definitions with validation
router.post('/tasks', validateTaskCreation, taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', validateTaskId, taskController.deleteTask); 
router.get('/tasks/:id', validateTaskId, taskController.getSingleTask);
router.patch('/tasks/:id', validateTaskUpdate, taskController.updateTask);

export default router;