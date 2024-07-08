const User = require('./user');
const Review = require('./review');

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
    User,
    Review
};