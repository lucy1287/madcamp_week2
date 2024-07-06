const express = require('express');

const app = express();

const crawlerRouter = require('./routes/crawler');
//const kakaoLoginRouter = require('./routes/kakaoLogin');

app.get('/', (req, res) => {
    res.send('hello node');
})

app.use('/crawler', crawlerRouter);
//app.use('/kakaoLogin', kakaoLoginRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log('서버가 3000번 포트에서 대기 중');
});

app.on('error', (error) => {
    console.error('에러 발생:', error);
});