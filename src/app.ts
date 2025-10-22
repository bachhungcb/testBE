import express, { Express } from 'express'; // Import các kiểu dữ liệu của Express
import sequelize from './config/db';
import todoRoutes from './routes/todo';
import './models/todo'; // Quan trọng: Import file model để nó được đăng ký với Sequelize
import cors from "cors"
const app: Express = express(); // Định kiểu cho 'app'
app.use(express.json());
app.use(cors())
app.use('/', todoRoutes);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Kết nối MSSQL thành công.');

        // Đồng bộ model (tạo bảng nếu chưa có)
        await sequelize.sync();
        console.log('🔄 Các model đã được đồng bộ.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Không thể kết nối đến database:', error);
    }
};

startServer();