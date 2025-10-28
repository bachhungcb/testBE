import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

interface IUserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: string;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id?: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare role: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, username: {
        type: DataTypes.STRING,
        allowNull: false,
    }, email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    }
}, {
    sequelize,
    tableName: 'Users',
});

export default User;