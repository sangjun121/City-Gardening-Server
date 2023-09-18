const connectToDatabase = require('../config/database-pool.js');
//로그인 세션 관리
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const login = async (req, res) => {
    const paramId = req.body.id; //위에 use(json과 urlencoded)덕분에 알맞은 형태로 변경해주기 때문에 req.body 식으로 접근가능하다
    const paramPassword = req.body.password;

    const db = await connectToDatabase(); //데이터 베이스 커넥션 받아오기

    try {
        const user = await db
            .collection('userInformation')
            .findOne({ id: paramId }); //1. 아이디 찾기

        if (user) {
            //해당하는 아이디가 없으면 null반환한다.
            if (user.password === paramPassword) {
                //로그인 성공
                res.json({ success: true, description: '로그인 성공' });
            } else {
                //비밀번호 불일치
                res.json({ success: false, error: '비밀번호 불일치' });
            }
        } else {
            // 해당 아이디가 없는 경우
            res.json({ success: false, error: '해당 아이디 없음' });
        }
        //커낵션 닫을 필요 없음 몽고디비 드라이버가 내부적으로 커넥션 풀링을 관리하고 insertone함수 호출 후 자동으로 커넥션을 반환하고 닫음
    } catch (error) {
        //쿼리문 실행 실패시
        console.error('Error finding document:', error);
        res.json({
            success: false,
            error: `데이터 베이스 조회 실패, 에러코드: ${error}`,
        });
    }
};
module.exports = login;
