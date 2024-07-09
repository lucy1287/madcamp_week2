var express = require('express');
var router = express.Router();

const plan = require("../controllers/plan");

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

module.exports = router;