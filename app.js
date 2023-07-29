const express = require('express');
const path = require('path'); //경로명을 단순화 해주는 모듈
const static = require('serve-static'); //경로 설정시 최상위 루트 디렉토리 설정해주는 모듈
const adduser = require('./src/add-user.js');
const login = require('./src/login.js');
const getAllSidoList = require('./src/get-all-sido-list.js');
const getLocationCode = require('./src/openAPI/get-location-code.js'); ///////////////////////////////////

const app = express(); //웹서버를 열어줌
app.use(express.urlencoded({ extended: true })); //웹서버의 환경설정; 프론트에서 어떤 url 형태로 보내던 허용하겠다는 의미..(?)
app.use(express.json()); //json형태로 웹브라우저에서 날라오는것을 볼수 있게끔
app.use('/public', static(path.join(__dirname, 'public'))); //public 을 조상 디렉토리로 설정? , path.join은 현재 디렉토리인 __dirname과 "public"을 합침

app.post('/process/adduser', adduser); // 회원가입
app.post('/process/login', login); // 로그인
app.get('/volunteer/location', getAllSidoList); //시도 주소 정보 응답
app.post('/location/code', getLocationCode); ///////////////////////////////////////////////

app.listen(3000, () => {
    console.log('서버 작동 성공');
});
