var express = require('express');
var router = express.Router();
var review = require('../controllers/review');
var multer = require('multer');

// 이미지 업로드
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');

    },
    filename: function (req, file, cb) {
        var original = file.originalname;
        var file_extension = original.split(".");
        // Make the file name the date + the file extension
        filename =  Date.now() + '.' + file_extension[file_extension.length-1];
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });


// 새로운 리뷰 생성 라우트
router.post('/create/:id', upload.single('image'), async function(req, res) {

    try {
        let id = req.params.id;
        await review.createReview(req, id, res);
        res.end();

    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).send(`에러 발생: ${error}`);
    }
});

// 리뷰 전체 보기 라우트
router.get('/all', async (req, res) => {
    try {
        const reviews = await review.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '리뷰 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

// 리뷰 전체 보기 라우트
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const reviews = await review.getReviewsByUserId(id);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '리뷰 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

router.get('/keyword/:keyword', async (req, res) => {
    try {
        let keyword = req.params.keyword;
        const reviews = await review.getReviewsByKeyword(keyword);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).json({ message: '리뷰 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;