const dbPool = require('../config/database-pool.js');

const adduser = (req, res) => {
    const paramId = req.body.id; //위에 use(json과 urlencoded)덕분에 알맞은 형태로 변경해주기 때문에 req.body 식으로 접근가능하다
    const paramName = req.body.name;
    const paramAge = req.body.age;
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
            'insert into users_information (id, name, age, password) values (?,?,?,?);',
            [paramId, paramName, paramAge, paramPassword],
            (err, result) => {
                conn.release(); //커넥션 다쓰고 다음사람에게 넘겨주기
                console.log('실행된 sql: ' + exec.sql); //exec.sql하면 우리가 실제로 보냈던 쿼리문이 ?에 값이 치환된걸로 보여준다.

                if (err) {
                    //쿼리문 실행시 오류 발생
                    if (err.code === 'ER_DUP_ENTRY') {
                        //아이디 중복일 경우 쿼리문 실행 실패
                        res.json({
                            success: false,
                            reason: 'Duplicate_Entry_for_ID',
                        });
                        return;
                    }
                    res.json({ success: false }); //나머지 이유로 쿼리문 실행 실패시
                    return;
                }

                if (result.length > 0) {
                    console.log('회원가입 성공');
                    res.json({ success: true });
                    return;
                }

                console.log('회원가입 실패');
                res.json({ success: false });
            }
        );
    });
};

module.exports = adduser;
