const express = require('express');
const path = require('path'); //경로명을 단순화 해주는 모듈
const static = require('serve-static'); //경로 설정시 최상위 루트 디렉토리 설정해주는 모듈
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passportConfig = require('./lib/passport');
const fileStore = require('session-file-store')(session);
const passport = require('passport');
dotenv.config();
passportConfig();

//라우터 가져오기
const authRouter = require('./src/routes/auth');
const landRouter = require('./src/routes/land');
const app = express();

//미들웨어 : 요청 - 응답 중간에 뭔가 실행되는 코드
app.use(express.urlencoded({ extended: true })); //웹서버의 환경설정; 프론트에서 어떤 url 형태로 보내던 허용하겠다는 의미..(?)
app.use(express.json()); //json형태로 클라이언트에서 날라오는것을 볼수 있게끔
app.use(express.static('public'));
app.use('/upload', express.static('upload'));
// app.use('/public', static(path.join(__dirname, 'public'))); //public 을 조상 디렉토리로 설정? , path.join은 현재 디렉토리인 __dirname과 "public"을 합침

// passport 관련 미들웨어
app.use(cookieParser(process.env.SESSION_SECRET_CODE));
app.use(
    session({
        secret: process.env.SESSION_SECRET_CODE,
        resave: false,
        saveUninitialized: true,
        cookie: {
            //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
            httpOnly: true,
            secure: false,
        },
        store: new fileStore(),
    })
);
app.use(passport.initialize()); // 요청(req) 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

//API 라우터
app.use('/auth', authRouter);
app.use('/land', landRouter);

app.listen(process.env.PORT, () => {
    console.log('서버 작동 성공');
});
