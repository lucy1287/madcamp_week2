const { Plan, Concert } = require("../models/associations");

exports.createPlan = async function(req, user_id, res) {
    try {
        const planData = req.body;

        // 날짜 문자열에서 시작 날짜 추출
        let startDateString = planData.date;
        if (startDateString.includes('~')) {
            startDateString = startDateString.split('~')[0].trim();
        }
        else if (startDateString.includes('-')) {
            startDateString = startDateString.split('-')[0].trim();
        }
        const startDate = new Date(startDateString);

        // Date 객체를 원하는 형식으로 포맷팅 (예: YYYY-MM-DD 형식의 문자열)
        const formattedDate = startDate.toISOString().split('T')[0];

        let plan = await Plan.create({
            concert_id: planData.concert_id,
            date: formattedDate,
            user_id: user_id
        });
        await plan.save();
        res.status(201).json({ message: '일정이 성공적으로 생성되었습니다.'});

    } catch (err) {
        res.status(500).json({ message: '일정 생성 중 오류가 발생했습니다.', error: err.message });
    }
};

exports.getPlansByUserId = async function(id) {
    try {
        const plans = await Plan.findAll({
            attributes: ['date'],
            include: [{
                model: Concert,
                as: 'concert',
                attributes: ['title', 'place', 'date', 'image_url'],
                required: true // INNER JOIN으로 조인
            }],
            where: { user_id: id }
        });
        return plans;
    } catch (err) {
        console.error('일정 조회 중 오류 발생:', err);
        throw new Error('해당 사용자의 일정 조회 중 오류가 발생했습니다.');
    }
};