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
        const homeRouter = require('./routes/home');
        const planRouter = require('./routes/plan');

        app.get('/', (req, res) => {
            res.send('hello node');
        });

        // 라우터 연결
        app.use('/crawler', crawlerRouter);
        app.use('/user', userRouter); // 새로운 사용자 라우터 연결
        app.use('/chat', chatRouter);
        app.use('/review', reviewRouter);
        app.use('/home', homeRouter);
        app.use('/plan', planRouter);

        const io = require('socket.io')(http);

        const port = 3000;

        // 사용자가 접속한 방 정보를 담는 객체
        let rooms = {};

        io.on('connection', function(socket) {
            // 접속
            console.log(`${socket.id} connected`);
            var id_message = {
                id: `${socket.id} 나의 아이디`
            }
            socket.emit('check_con', id_message);


            // 클라이언트가 특정 방에 접속 요청 처리
            socket.on('join_room', function(chatRoomId) {
                // 새로운 방 생성 (이미 존재하면 기존 방에 참여)
                if (!rooms[chatRoomId]) {
                    rooms[chatRoomId] = { clients: [] };
                    console.log(`Created room: ${chatRoomId}`);
                }

                // 기존에 속한 방 leave
                Object.keys(socket.rooms).forEach(function(room) {
                    if (room !== socket.id) {
                        socket.leave(room);
                    }
                });

                // 요청한 방에 join
                socket.join(chatRoomId);
                rooms[chatRoomId].clients.push(socket.id);
                console.log(`${socket.id} joined ${chatRoomId}`);

                // 해당 방에 입장을 알리는 메시지 전송
                io.to(chatRoomId).emit('joined_room', `${socket.id} joined ${chatRoomId}`);
            });

            // 클라이언트가 메시지를 보낸 경우 처리
            socket.on('msg', function(data) {
                console.log(`Message from ${socket.id} in room ${data.room}: ${data.message}`);

                // 해당 방에 메시지 전송
                io.to(data.room).emit('message_received', {
                    sender: socket.id,
                    message: data.message
                });
            });

            // 클라이언트가 연결을 끊은 경우 처리
            socket.on('disconnect', function() {
                console.log(`${socket.id} disconnected`);

                // 방에서 클라이언트 제거
                Object.keys(rooms).forEach(function(roomName) {
                    const index = rooms[roomName].clients.indexOf(socket.id);
                    if (index !== -1) {
                        rooms[roomName].clients.splice(index, 1);
                        io.to(roomName).emit('left_room', `${socket.id} left ${roomName}`);
                        // 방에 속한 클라이언트가 없으면 방 삭제
                        if (rooms[roomName].clients.length === 0) {
                            delete rooms[roomName];
                            console.log(`Deleted room: ${roomName}`);
                        }
                    }
                });
            });
        });

        http.listen(port, function() {
            console.log(`listening on *:${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });