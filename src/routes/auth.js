const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('../../lib/passport/middlewares'); // 내가 만든 사용자 미들웨어
const router = express.Router();
const connectToDatabase = require('../../config/database-pool');

//회원가입
router.post('/adduser', async (req, res) => {
    const paramId = req.body.id; //위에 use(json과 urlencoded)덕분에 알맞은 형태로 변경해주기 때문에 req.body 식으로 접근가능하다
    const paramName = req.body.name;
    const paramAge = req.body.age;
    const paramPassword = req.body.password;

    const db = await connectToDatabase();

    const dataToInsert = {
        id: paramId,
        name: paramName,
        age: paramAge,
        password: paramPassword,
    };

    try {
        db.collection('userInformation').insertOne(dataToInsert);
        console.log('저장 완료');
        res.json({ success: true, description: '회원가입 성공' });
        //커낵션 닫을 필요 없음 몽고디비 드라이버가 내부적으로 커넥션 풀링을 관리하고 insertone함수 호출 후 자동으로 커넥션을 반환하고 닫음
    } catch (error) {
        console.error('Error inserting document:', error);
        res.json({
            success: false,
            error: `데이터 베이스 저장 실패, 에러코드: ${error}`,
        });
    }
});

//로그인
//미들웨어인 isNotLoggedIn 통과해야 async(req,res,next)=> 미들웨어 실행
router.post('/login', isNotLoggedIn, (req, res, next) => {
    //local로 실행되면 localstrategy.js찾아 실행한다. 그리고 localstrategy에서 done()이 실행되면 (authError,user,info)=>{} 이게 실행된다.
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            //데베 조회 실패시
            // done(err)인 경우
            console.error(authError);
            return next(authError);
        }
        // done(null, false, { message: '비밀번호가 일치하지 않습니다.' }) 가 처리된 경우
        if (!user) {
            //아이디나 비밀번호가 틀린경우
            return res.json({ success: false, error: info.message });
        } else {
            //로그인이 성공(user가 false가 아닌 경우), passport/index.js로 가서 실행시킨다.
            return req.login(user, (loginError) => {
                //loginError => 미들웨어는 passport/index.js의 passport.deserializeUser((id, done) => 가 done()이 되면 실행하게 된다.
                // 만일 done(err) 가 됬다면,
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                // done(null, user)로 로직이 성공적이라면, 세션에 사용자 정보를 저장해놔서 로그인 상태가 된다.

                return res.json({ name: user.name, seed: user.seed });
            });
        }
    })(req, res, next);
});

module.exports = router;
