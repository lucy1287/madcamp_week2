const express = require('express');
const app = express();
const http = require('http');
const { createWebSocketServer } = require('./controllers/chat');
const sequelize = require('./config/database');

// JSON 파싱을 위해 express.json() 미들웨어 사용
app.use(express.json());

// sequelize
sequelize.authenticate()
    .then(() => {
        console.log('MySQL 데이터베이스 연결 성공!');
        return sequelize.sync();
    })
    .then(() => {
        console.log('모델 동기화 완료!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Sequelize.sync()를 호출하여 모든 모델과 데이터베이스를 동기화
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        // 이후 서버 시작 등의 작업을 여기서 수행

        // 라우터 생성
        const crawlerRouter = require('./routes/crawler');
        const userRouter = require('./routes/user');
        const chatRouter = require('./routes/chat');
        const reviewRouter = require('./routes/review');

        app.get('/', (req, res) => {
            res.send('hello node');
        });

        // 라우터 연결
        app.use('/crawler', crawlerRouter);
        app.use('/user', userRouter); // 새로운 사용자 라우터 연결
        app.use('/chat', chatRouter);
        app.use('/review', reviewRouter);

        // HTTP 서버 생성
        const server = http.createServer(app);

        // 실행
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`서버가 ${PORT}번 포트에서 대기 중`);
        });

        // HTTP 서버 시작 후 웹 소켓 서버 시작
        createWebSocketServer(server);
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });