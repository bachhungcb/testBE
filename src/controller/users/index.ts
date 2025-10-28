import { Router, Request, Response } from 'express';
import sequelize from '../../config/db';
import User from '../../models/users';
import { QueryTypes } from "sequelize"; // Import model TS

//GET ALL
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User.create({
            username: name,
            email: email,
            password: password,
            role: role || 'user',
        });

        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Lỗi không xác định' });
        }
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send('Not Found user');
        } else {
            res.json(user);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Lỗi không xác định' });
        }
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('Not Found user');
        }

        user.set({
            username: req.body.name || user.username,
            email: req.body.email || user.email,
        });

        await user.save();
        res.json(user);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send('Not Found user');
        }

        await user.destroy();
        res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}


const loginUser = async (req: Request, res: Response) => {
    try { 
        const { email, password } = req.body;
        const user = await sequelize.query(
            'SELECT * FROM Users WHERE email = ' + email + ' AND password = ' + password,
            {
                type: QueryTypes.SELECT,
            }
        );

        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
     }
}

export { getUsers, createUser, getUserById, updateUser, deleteUser, loginUser };
