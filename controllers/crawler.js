const axios = require('axios');
const cheerio = require('cheerio');
const Concert = require('../models/concert');  // 경로를 필요에 따라 조정하세요

exports.crawler = async function (req, res) {
    // 크롤링할 웹 페이지의 URL
    const url = 'https://tickets.interpark.com/contents/genre/concert';

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const panelContents = $('.Panel_contents__f7025.Panel_fill-scroll__8271f');
        let results = [];

        panelContents.find('[role="link"]').each(async (index, element) => {
            const concertName = $(element).find('li.TicketItem_goodsName__Ju76j').text().trim();
            const concertPlace = $(element).find('li.TicketItem_placeName__ls_9C').text().trim();
            const concertDate =  $(element).find('li.TicketItem_playDate__5ePr2').text().trim();
            const imgSrc = $(element).find('img.TicketItem_image__U6xq6').attr('src');

            // const dataUrl = $(element).attr('data-url');  // data-url 속성에서 링크 추출
            // const fullUrl = 'https://tickets.interpark.com' + dataUrl;

            results.push({
                concertName: concertName,
                concertPlace: concertPlace,
                concertDate: concertDate,
                imgSrc: 'https://tickets.interpark.com' + imgSrc
                // fullUrl: fullUrl
            });

            //콘서트 데이터를 생성하고 저장
            try {
                await Concert.create({
                    title: concertName,
                    place: concertPlace,
                    image_url: 'https://tickets.interpark.com' + imgSrc,
                    date: concertDate
                });
                results.push({
                    title: concertName,
                    place: concertPlace,
                    image_url: 'https://tickets.interpark.com' + imgSrc,
                    date: concertDate
                });
            } catch (dbError) {
                console.error('데이터베이스 저장 중 오류 발생: ', dbError);
            }
        });

        return results;

    } catch (error) {
        console.error('페이지 가져오기 중 오류 발생: ', error);
        return res.status(500).send('페이지 가져오기 중 오류 발생');
    }
};