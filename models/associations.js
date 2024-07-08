const User = require('./user');
const Review = require('./review');
const ChatRoom = require('./chat');

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ChatRoom, { foreignKey: 'user_id', as: 'chatRooms' });
ChatRoom.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
    User,
    Review,
    ChatRoom
};