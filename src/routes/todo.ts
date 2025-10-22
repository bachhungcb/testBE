import { Router, Request, Response } from 'express';
import sequelize from '../config/db';
import Todo from '../models/todo';
import {QueryTypes} from "sequelize"; // Import model TS
import {createTodo, deleteTodo, getTodoById, getTodos, updateTodo} from '../controller/todos/index'
const router = Router();

// 1. CREATE
router.post('/add-todo',createTodo);

// 2. READ All
router.get('/todos',getTodos);

// 3. READ by ID
router.get('/todos/:id', getTodoById);

// 4. UPDATE
router.put('/edit-todo/:id', updateTodo);

// 5. DELETE
router.delete('/delete-todo/:id', deleteTodo);

export default router;