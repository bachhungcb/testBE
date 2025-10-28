import { Router, Request, Response } from 'express';
import sequelize from '../config/db';
import Users from '../models/users';
import {QueryTypes} from "sequelize"; // Import model TS
import {getUsers, createUser, getUserById, updateUser, deleteUser, loginUser} from '../controller/users/index'
const router = Router();

// 1. CREATE
router.post('/add-user',createUser);

// 2. READ All
router.get('/users',getUsers);

// 3. READ One
router.get('/users/:id',getUserById);

// 4. UPDATE
router.put('/users/:id',updateUser);

// 5. DELETE
router.delete('/users/:id',deleteUser);

// 6. LOGIN
router.post('/login',loginUser);

export default router;