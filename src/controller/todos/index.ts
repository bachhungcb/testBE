import { Router, Request, Response } from 'express';
import sequelize from '../../config/db';
import Todo from '../../models/todo';
import {QueryTypes} from "sequelize"; // Import model TS

//Get ALL
const getTodos = async(req: Request, res: Response) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const createTodo = async (req: Request, res: Response)=>{
    try {
        const { name, description } = req.body;

        // Todo.create bây giờ đã được 'type-safe'
        const newTodo = await Todo.create({
            name: name,
            description: description,
            status: false // Bạn có thể bỏ qua nếu đã set defaultValue
        });

        res.status(201).json(newTodo);
    } catch (error) {
        // Nên định kiểu cho 'error'
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Lỗi không xác định' });
        }
    }
}

const getTodoById = async (req: Request, res: Response) => {
    try {
        const todos = await sequelize.query(
            'SELECT * FROM Todos WHERE id = ' + req.params.id,
            {
                type: QueryTypes.SELECT,
            }
        );
        if(todos.length > 0) {
            res.status(200).json(todos);
        }else{
            res.status(404).send('Not Found');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        const todoId = parseInt(req.params.id);
        const todo = await Todo.findByPk(todoId);

        if (!todo) {
            return res.status(404).send('Không tìm thấy Todo');
        }

        // Cập nhật (dùng .set() hoặc .update())
        todo.set({
            name: req.body.name || todo.name,
            description: req.body.description || todo.description,
            status: req.body.status !== undefined ? req.body.status : todo.status
        });

        await todo.save(); // Lưu thay đổi
        res.json(todo);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const deleteTodo = async (req: Request, res: Response)=>{
    try {
        const todoId = parseInt(req.params.id);
        const todo = await Todo.findByPk(todoId);

        if (!todo) {
            return res.status(404).send('Không tìm thấy Todo');
        }

        await todo.destroy();
        res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}
export {getTodos, createTodo, getTodoById, updateTodo, deleteTodo}