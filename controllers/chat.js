const  ChatRoom  = require("../models/chat");
const {Review, User} = require("../models/associations");

// 채팅방 생성 함수
exports.createChatRoom = async function(req, user_id, res) {
    try {
        const chatRoomData = req.body;

        let chatRoom = await ChatRoom.create({
            title: chatRoomData.title,
            content: chatRoomData.content,
            user_id: user_id
        });
        await chatRoom.save();
        res.status(201).json({ message: '채팅방이 성공적으로 생성되었습니다.'});

    } catch (err) {
        res.status(500).json({ message: '채팅방 생성 중 오류가 발생했습니다.', error: err.message });
    }
};

exports.getAllChatRooms = async function() {
    try {
        const chatRooms = await ChatRoom.findAll({
            attributes: ['chat_room_id', 'title', 'content', 'count', 'created_at'],
            include: [
                {
                    model: User,
                    as: 'user', // 여기에 alias를 명시적으로 지정합니다.
                    attributes: ['name'],
                }
            ],
            order: [['created_at', 'DESC']]
        });

        const formattedReviews = chatRooms.map(chatRoom => {
            return {
                chat_room_id: chatRoom.chat_room_id,
                title: chatRoom.title,
                content: chatRoom.content,
                count: chatRoom.count,
                created_at: chatRoom.created_at,
                name: chatRoom.user.name // user.name을 최상위 레벨로 변환
            };
        });

        return formattedReviews;
    } catch (err) {
        console.log(err)
        throw new Error('채팅방 조회 중 오류가 발생했습니다.');
    }
};


// const http = require('http');
// const WebSocket = require('ws');
//
// function createWebSocketServer(port) {
//     const server = http.createServer();
//     const wss = new WebSocket.Server({ server });
//
//     wss.on('connection', (ws) => {
//         console.log('새로운 클라이언트가 연결되었습니다.');
//
//         ws.on('message', (message) => {
//             console.log(`서버에서 받은 메시지: ${message}`);
//
//             // 클라이언트에게 받은 메시지를 모든 클라이언트에게 전송
//             wss.clients.forEach((client) => {
//                 if (client !== ws && client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//         });
//
//         ws.on('close', () => {
//             console.log('클라이언트가 연결을 끊었습니다.');
//         });
//     });
//
//     server.listen(port, () => {
//         console.log(`WebSocket 서버가 ${port} 포트에서 시작되었습니다.`);
//     });
// }
//
// module.exports = { createWebSocketServer };


// var io = require('socket.io')(http);
//
// var port = 3000;
//
// io.on('connection', function (socket) {//클라이언트 연결되면
//     console.log(socket.id, 'Connected');//연결됨을 콘솔에 출력
//     var id_message={
//         id:`${socket.id} 나의 아이디`
//     }
//     socket.emit('check_con',id_message);
//
//     socket.on('msg', function (data) {
//         //클라이언트에게 msg가 emit되면 실행
//         console.log(socket.id, data);
//
//         console.log("-------------------");
//         console.log('id: ',data.id);
//         console.log('password: ',data.password);
//         console.log("-------------------");
//         var message={
//             msg:`Server : "${data.id}" 당신의 id.`,
//             msg2:"어떠세요?"
//         }
//         socket.emit('msg_to_client',message );//클라이언트로 메시지 전송
//     });
//     socket.on('disconnect',function(){//클라이언트 연결 끊어지면 자동 실행
//         console.log('disconnected');
//     })
// });
//
// http.listen(port, () => {//클라이언트 대기
//     console.log("listening on *:" + port);
// });
