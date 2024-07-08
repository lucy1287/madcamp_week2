const express = require('express');
const app = express();
const http = require('http').createServer(app); // Express 앱을 사용해 HTTP 서버 생성
const path = require('path');
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

        // 정적 파일 제공을 위한 middleware 설정
        app.use('/public', express.static(path.join(__dirname, 'public')));

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

        const io = require('socket.io')(http);

        const port = 3000;

        io.on('connection', function (socket) {
            console.log(socket.id, 'Connected');
            var id_message = {
                id: `${socket.id} 나의 아이디`
            }
            socket.emit('check_con', id_message);

            socket.on('msg', function (data) {
                console.log(socket.id, data);

                console.log("-------------------");
                console.log('id: ', data.id);
                console.log('password: ', data.password);
                console.log("-------------------");
                var message = {
                    msg: `Server : "${data.id}" 당신의 id.`,
                    msg2: "어떠세요?"
                }
                socket.emit('msg_to_client', message);
            });

            socket.on('disconnect', function () {
                console.log('disconnected');
            });
        });

        http.listen(port, () => {
            console.log("listening on *:" + port);
        });
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });