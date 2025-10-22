import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/db';

// 1. Định nghĩa các thuộc tính (attributes) của Model
// Dùng interface để TypeScript hiểu rõ các thuộc tính
interface ITodoAttributes {
    id?: number; // 'id' là tùy chọn vì nó sẽ tự động tăng
    name: string;
    description: string | null; // Cho phép null
    status: boolean;
}

// 2. Định nghĩa Model, kế thừa từ Model của Sequelize
// InferAttributes: Suy ra kiểu thuộc tính khi đọc (ví dụ: todo.name)
// InferCreationAttributes: Suy ra kiểu khi tạo (ví dụ: lúc gọi Todo.create)
// @ts-ignore
class Todo extends Model<ITodoAttributes, InferCreationAttributes<ITodoAttributes>> {
    // Định nghĩa kiểu dữ liệu cho từng thuộc tính
    // Dấu '!' để báo với TS rằng thuộc tính này sẽ được Sequelize khởi tạo
    public id!: number;
    public name!: string;
    public description!: string | null;
    public status!: boolean;

    // Timestamps (createdAt, updatedAt)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 3. Khởi tạo Model (Init)
// Thay vì dùng sequelize.define, chúng ta dùng Model.init
Todo.init(
    {
        // Định nghĩa các cột (columns)
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // Phải khớp với interface 'string | null'
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        // Các tùy chọn
        sequelize,        // Truyền vào instance kết nối
        tableName: 'Todos', // Tên bảng trong database
        // timestamps: false // Bỏ comment nếu bạn không muốn cột createdAt/updatedAt
    }
);

export default Todo;