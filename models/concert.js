const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Concert = sequelize.define('Concert', {
    // Concert 모델의 속성들을 정의
    concert_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // 추가적인 속성들을 필요에 따라 정의 가능
}, {
    tableName: 'concerts',
    timestamps: false
});

module.exports = Concert;