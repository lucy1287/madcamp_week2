const Review = require('../models/review');

// 사용자 로그인 또는 생성 함수
exports.createReview = async function(req, id, res) {
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

// 모든 리뷰 조회 함수
// const getAllReviews = async () => {
//     try {
//         const reviews = await Review.findAll({
//             order: [['createdAt', 'DESC']]
//         });
//         return reviews;
//     } catch (err) {
//         throw new Error('리뷰 조회 중 오류가 발생했습니다.');
//     }
// };
exports.getAllReviews = async function() {
    try {
        const reviews = await Review.findAll({
            order: [['created_at', 'DESC']]
        });
        return reviews;
    } catch (err) {
        throw new Error('리뷰 조회 중 오류가 발생했습니다.');
    }
};

// 본인이 작성한 리뷰 조회 함수
exports.getReviewsByUserId = async function(id) {
    try {
        const reviews = await Review.findAll({
            where: { user_id: id },
            order: [['created_at', 'DESC']]
        });
        return reviews;
    } catch (err) {
        throw new Error('해당 사용자의 리뷰 조회 중 오류가 발생했습니다.');
    }
};

//module.exports = { createReview };