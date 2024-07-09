const User = require('./user');
const Review = require('./review');
const ChatRoom = require('./chat');
const Plan = require('./plan');
const Concert = require('./concert'); // Concert 모델 추가

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ChatRoom, { foreignKey: 'user_id', as: 'chatRooms' });
ChatRoom.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Plan, { foreignKey: 'user_id', as: 'plans' });
Plan.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Concert.hasMany(Plan, { foreignKey: 'concert_id', as: 'plans' }); // Concert와 Plan의 관계 설정
Plan.belongsTo(Concert, { foreignKey: 'concert_id', as: 'concert' });

module.exports = {
    User,
    Review,
    ChatRoom,
    Plan,
    Concert // Concert 모델 내보내기
};