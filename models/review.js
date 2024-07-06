const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Review = sequelize.define('Review', {
    // Review 모델의 속성들을 정의
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
        // 추가적인 속성들을 필요에 따라 정의 가능
    }, {
        // 모델 옵션들을 설정 가능
});

module.exports = Review;