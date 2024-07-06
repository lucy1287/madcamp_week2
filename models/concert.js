const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Concert = sequelize.define('Concert', {
    // Concert 모델의 속성들을 정의
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // 추가적인 속성들을 필요에 따라 정의 가능
}, {
    // 모델 옵션들을 설정 가능
});

module.exports = Concert;