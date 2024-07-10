var express = require('express');
var router = express.Router();

var chat = require('../controllers/chat');
const review = require("../controllers/review");

router.get('/', (req, res) => {
    res.send('Chat API is running');
});

// 새로운 채팅방 생성 라우트
router.post('/room/create/:user_id', async function(req, res) {

    try {
        let user_id = req.params.user_id;
        await chat.createChatRoom(req, user_id, res);
        res.end();

    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).send(`에러 발생: ${error}`);
    }
});

// 채팅방 전체 보기 라우트
router.get('/room/all', async (req, res) => {
    try {
        const chatRooms = await chat.getAllChatRooms();
        res.status(200).json(chatRooms);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '채팅방 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

router.get('/room/keyword/:keyword', async (req, res) => {
    try {
        let keyword = req.params.keyword;
        const reviews = await chat.getChatRoomsByKeyword(keyword);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '채팅방 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;