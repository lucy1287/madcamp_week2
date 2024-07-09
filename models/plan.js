const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Concert = require('./concert');
const User = require('./user');

const Plan = sequelize.define('Plan', {
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    concert_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Concert, // 참조할 모델 (Concert 모델)
            key: 'concert_id' // 참조할 속성 (Concert 모델의 기본 키)
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // 참조할 모델 (User 모델)
            key: 'user_id' // 참조할 속성 (User 모델의 기본 키)
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'plans',
    timestamps: false
});

module.exports = Plan;