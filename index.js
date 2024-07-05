const express = require('express');

const app = express();

const crawlerRouter = require('./routes/crawler');

app.get('/', (req, res) => {
    res.send('hello node');
})

// app.get('/crawler', (req, res) => {
//
// })

app.use('/crawler', crawlerRouter);

app.listen(3000, () => console.log('3000번 포트에서 대기중'));