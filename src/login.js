const dbPool = require('../config/database-pool.js');

const login = (req, res) => {
    const paramId = req.body.id; //위에 use(json과 urlencoded)덕분에 알맞은 형태로 변경해주기 때문에 req.body 식으로 접근가능하다
    const paramPassword = req.body.password;

    dbPool.getConnection((err, conn) => {
        //놀고 있는 커넥션 하나 줘 > 커넥션 주면서 안에 함수를 호출한다. 커넥션이 없으면 err준다.
        if (err) {
            conn.release();
            console.log('커넥션 오류');
            res.end(); //오류가 나도 꼭 답장은 써줘야 한다.
            return;
        }

        const exec = conn.query(
            'select * from users_information where id = ?',
            [paramId],
            (err, result) => {
                conn.release(); //커넥션 다쓰고 다음사람에게 넘겨주기
                console.log('실행된 sql: ' + exec.sql); //exec.sql하면 우리가 실제로 보냈던 쿼리문이 ?에 값이 치환된걸로 보여준다.

                if (err) {
                    console.log('쿼리문 실행시 오류 발생');
                    res.end();
                    return;
                }

                if (result.length > 0) {
                    //아이디 찾기 성공
                    if (result[0].password === paramPassword) {
                        //비밀번호 일치
                        console.log('로그인 성공');
                        res.json({ success: true });
                        return;
                    }

                    //비밀번호 불일치
                    console.log('비밀번호가 틀렸습니다.');
                    res.json({ success: false, reason: 'wrong_password' });
                    return;
                }

                //해당 아이디가 없음
                console.log('해당 아이디가 없습니다.');
                res.json({ success: false, reason: 'no_id' });
            }
        );
    });
};

module.exports = login;
