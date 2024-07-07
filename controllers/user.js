const User = require('../models/user');

// 사용자 로그인 또는 생성 함수
const loginUser = async (req, res) => {
    try {
        const { name, access_token } = req.body;

        // 기존 사용자 검색
        let user = await User.findOne({ where: { name } })

        if (user) {
            // 기존 사용자가 있으면 액세스 토큰 업데이트
            user.access_token = access_token;
            await user.save();
            res.status(200).json({ message: '사용자가 성공적으로 로그인했습니다.', user });
        } else {
            // 기존 사용자가 없으면 새 사용자 생성
            user = await User.create({
                name,
                access_token
            });
            res.status(201).json({ message: '사용자가 성공적으로 생성되었습니다.', user });
        }
    } catch (err) {
        res.status(500).json({ message: '사용자 로그인 또는 생성 중 오류가 발생했습니다.', error: err.message });
    }
};

module.exports = { loginUser };