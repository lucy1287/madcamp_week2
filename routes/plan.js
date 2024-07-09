var express = require('express');
var router = express.Router();

const plan = require("../controllers/plan");
const review = require("../controllers/review");

router.post('/create/:user_id', async function(req, res) {

    try {
        let user_id = req.params.user_id;
        await plan.createPlan(req, user_id, res);
        res.end();

    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).send(`에러 발생: ${error}`);
    }
});

// 리뷰 전체 보기 라우트
router.get('/:user_id', async (req, res) => {
    try {
        let user_id = req.params.user_id;
        const plans = await plan.getPlansByUserId(user_id);
        res.status(200).json(plans);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '일정 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;