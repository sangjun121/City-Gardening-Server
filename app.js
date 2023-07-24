const express = require('express');
const mysql = require('mysql');
const path = require('path'); //경로명을 단순화 해주는 모듈
const static = require('serve-static'); //경로 설정시 최상위 루트 디렉토리 설정해주는 모듈
const dotenv = require('dotenv');
const exp = require('constants');
dotenv.config();

//database connection pool
const pool = mysql.createPool({
    connectionLimit: 10, //연결의 개수(풀의 갯수)
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug: false,
});

const app = express(); //웹서버를 열어줌
app.use(express.urlencoded({ extended: true })); //웹서버의 환경설정; 프론트에서 어떤 url 형태로 보내던 허용하겠다는 의미..(?)
app.use(express.json()); //json형태로 웹브라우저에서 날라오는것을 볼수 있게끔
// app.use('/public', static(path.join(__dirname, 'public'))); //public 을 조상 디렉토리로 설정? , path.join은 현재 디렉토리인 __dirname과 "public"을 합침

app.get('/hello', (req, res) => {
    res.json({
        hi: hello,
    });
});

//회원가입
app.post('/process/adduser', (req, res) => {
    //"/process/adduser"는 수신자. 이 주소로 post형태로 요청하면 뒤의 함수가 실행된다.
    console.log('/process/adduser가 호출됨 ' + req);

    const paramId = req.body.id; //위에 use(json과 urlencoded)덕분에 알맞은 형태로 변경해주기 때문에 req.body 식으로 접근가능하다
    const paramName = req.body.name;
    const paramAge = req.body.age;
    const paramPassword = req.body.password;

    pool.getConnection((err, conn) => {
        //놀고 있는 커넥션 하나 줘 > 커넥션 주면서 안에 함수를 호출한다. 커넥션이 없으면 err준다.
        if (err) {
            // conn.release();
            console.log('커넥션 오류');
            res.end(); //오류가 나도 꼭 답장은 써줘야 한다.
            return;
        }

        console.log('데이터베이스 연결 끈 얻었음');

        const exec = conn.query(
            'insert into users_information (id, name, age, password) values (?,?,?,?);',
            [paramId, paramName, paramAge, paramPassword],
            (err, result) => {
                conn.release(); //커넥션 다쓰고 다음사람에게 넘겨주기
                console.log('실행된 sql: ' + exec.sql); //exec.sql하면 우리가 실제로 보냈던 쿼리문이 ?에 값이 치환된걸로 보여준다.

                if (err) {
                    console.log('쿼리문 실행시 오류 발생');
                    console.dir(err); //디렉토리 형식으로 오류 출력 (계층구조로 출력한다, 객체의 속성을 출력한다, 요소를 json과 같은 트리구조로 출력한다.)

                    res.end();
                    return;
                }

                if (result) {
                    console.dir(result);
                    console.log('insert 성공');

                    res.json({ success: true });
                } else {
                    console.log('insert 실패');
                    res.json({ success: false });
                }
            }
        );
    });
});

app.listen(3000, () => {
    console.log('서버 작동 성공');
});
