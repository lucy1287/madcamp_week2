const Review = require('../models/review');

// 사용자 로그인 또는 생성 함수
const createReview = async (req, id, res) => {
    try {
        const reviewData = req.body;

        let review = await Review.create({
            image_url: req.file.path,
            title: reviewData.title,
            content: reviewData.content,
            rating: reviewData.rating,
            user_id: id
        });
        await review.save();
        res.status(201).json({ message: '리뷰가 성공적으로 생성되었습니다.'});

    } catch (err) {
        res.status(500).json({ message: '리뷰 생성 중 오류가 발생했습니다.', error: err.message });
    }
};

module.exports = { createReview };