// const mysql = require('mysql2');
//
// // AWS RDS MySQL 인스턴스의 엔드포인트, 포트, 데이터베이스 이름, 사용자 이름 및 암호를 설정합니다.
// const connection = mysql.createConnection({
//     host: 'madcamp-week2-db.cp4ko6qc8hj3.us-east-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'admin1234'
// });
//
// // 데이터베이스 연결 함수
// function connectToDatabase() {
//     // 데이터베이스에 연결합니다.
//     connection.connect((err) => {
//         if (err) {
//             console.error('연결 실패:', err);
//             return;
//         }
//         console.log('연결 성공!');
//     });
//
// }
//
// module.exports = { connectToDatabase };

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('madcamp_week2_db', 'admin', 'admin1234', {
    host: 'madcamp-week2-db.cp4ko6qc8hj3.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: true
    }
});

module.exports = sequelize;