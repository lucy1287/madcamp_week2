const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");
const User = require('./user');

const Review = sequelize.define('Review', {
    // Review 모델의 속성들을 정의
    review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // 참조할 모델 (User 모델)
            key: 'user_id'   // 참조할 속성 (User 모델의 기본 키)
        }
    }
        // 추가적인 속성들을 필요에 따라 정의 가능
    }, {
    tableName: 'reviews',
    timestamps: false
});

module.exports = Review;