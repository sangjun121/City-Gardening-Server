const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connectToDatabase = require('../../config/database-pool');

module.exports = () => {
    //auth 라우터에서 /login 요청이 오면 local설정대로 이쪽이 실행되게 된다.
    passport.use(
        new localStrategy(
            {
                //* req.body 객체인자 하고 키값이 일치해야 한다.
                usernameField: 'id', // req.body.id
                passwordField: 'password', // req.body.password
            },
            //* 콜백함수의  email과 password는 위에서 설정한 필드이다. 위에서 객체가 전송되면 콜백이 실행된다.
            async (userId, password, done) => {
                try {
                    //가입된 회원인지 확인
                    const db = await connectToDatabase();
                    const findedUser = await db
                        .collection('userInformation')
                        .findOne({ id: userId });
                    //만일 가입된 회원이면
                    if (findedUser) {
                        //해시비번을 비교
                        const result = await bcrypt.compare(
                            password,
                            findedUser.password
                        );
                        if (result) {
                            done(null, findedUser); // 성공이면 done의 2번째 인자에 선언
                        } else {
                            done(null, false, {
                                message: '비밀번호가 일치하지 않습니다.',
                            });
                        }
                        //done()을 호출하면, /login 요청온 auth 라우터로 다시 돌아가서 미들웨어 콜백을 실행하게 된다.
                    }
                    // DB에 해당 이메일이 없다면, 회원 가입 한적이 없다.
                    else {
                        done(null, false, {
                            message: '가입되지 않은 회원입니다.',
                        });
                    }
                } catch (error) {
                    console.error(error);
                    done(error); //done()의 첫번째 함수는 err용. 특별한것 없는 평소에는 null로 처리.
                }
            }
        )
    );
};
