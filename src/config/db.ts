const { Sequelize } = require('sequelize');

// Khởi tạo đối tượng Sequelize
const sequelize = new Sequelize(
    'VCS',  // Tên database
    'sa',  // Tên đăng nhập
    'A8*kao1i',  // Mật khẩu
    {
        host: 'scic.navistar.io', // Server host
        dialect: 'mssql', // Chỉ định rõ chúng ta đang dùng MSSQL
        port: 1435,

        // Các tùy chọn dành riêng cho MSSQL
        dialectOptions: {
            options: {
                encrypt: true, // Bắt buộc nếu dùng Azure SQL
                trustServerCertificate: true, // Dùng nếu bạn tự host và có chứng chỉ tự ký
            }
        },

        logging: console.log // (Tùy chọn) Hiện các câu lệnh SQL trong console
    }
);

export default sequelize;