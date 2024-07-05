const axios = require('axios');
const cheerio = require('cheerio');

exports.crawler = async function (req, res) {
    // 크롤링할 웹 페이지의 URL
    const url = 'https://tickets.interpark.com/contents/genre/concert';  // 실제 웹 페이지 URL로 변경해야 합니다

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const panelContents = $('.Panel_contents__f7025.Panel_fill-scroll__8271f');
        let results = [];

        panelContents.find('a.TicketItem_ticketItem__H51Vs').each((index, element) => {
            const concertName = $(element).find('li.TicketItem_goodsName__Ju76j').text().trim();
            const concertPlace = $(element).find('li.TicketItem_placeName__ls_9C').text().trim();
            const imgSrc = $(element).find('img.TicketItem_image__U6xq6').attr('src');

            results.push({
                concertName: concertName,
                concertPlace: concertPlace,
                imgSrc: 'https://tickets.interpark.com' + imgSrc
            });
        });

        return results;

    } catch (error) {
        console.error('Error fetching the page: ', error);
    }
};