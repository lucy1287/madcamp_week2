const Concert  = require("../models/concert");
const { Sequelize } = require('sequelize');

exports.getHotConcerts = async function() {
    try {
        const concerts = await Concert.findAll({
            attributes: ['concert_id', 'title', 'place', 'image_url', 'date'],
        });
        return concerts;
    } catch (err) {
        console.log(err)
        throw new Error('콘서트 조회 중 오류가 발생했습니다.');
    }
};

exports.getClosingSoonConcerts = async function() {
    try {
        const targetDate = '2024-07-12';
        const concerts = await Concert.findAll({
            attributes: [
                'concert_id',
                'title',
                'place',
                'image_url',
                [Sequelize.literal(`CAST(LEFT(date, 10) AS DATE)`), 'date_only']
            ],
            where: Sequelize.literal(`CAST(LEFT(date, 10) AS DATE) >= '${targetDate}'`),
            order: [
                [Sequelize.literal(`CAST(LEFT(date, 10) AS DATE)`)]
            ]
        });
        return concerts;
    } catch (err) {
        console.error(err);
        throw new Error('콘서트 조회 중 오류가 발생했습니다.');
    }
};