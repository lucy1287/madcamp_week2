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


// 새로운 사용자 생성 라우트
router.post('/create/:id', upload.single('image_url'), async function(req, res) {

    try {
        let id = req.params.id;
        await review.createReview(req, id, res);
        res.end();

    } catch (error) {
        console.error(`에러 발생: ${error}`);
        res.status(500).send(`에러 발생: ${error}`);
    }
});

module.exports = router;