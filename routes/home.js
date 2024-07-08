var express = require('express');
var router = express.Router();

const home = require("../controllers/home");

router.get('/hot', async (req, res) => {
    try {
        const concerts = await home.getHotConcerts();
        res.status(200).json(concerts);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '리뷰 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

router.get('/closingSoon', async (req, res) => {
    try {
        const concerts = await home.getClosingSoonConcerts();
        res.status(200).json(concerts);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '리뷰 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;