const dbPool = require('../../config/database-pool.js');

const getAllSidoList = (req, res) => {
    const sidoList = [];

    dbPool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            console.log('커넥션 오류');
            res.end(); //오류가 나도 꼭 답장은 써줘야 한다.
            return;
        }

        console.log('데이터베이스 연결 끈 얻었음');

        const exec = conn.query(
            'SELECT sido FROM locations_sido ORDER BY id ASC;',
            (err, result) => {
                conn.release(); //커넥션 다쓰고 다음사람에게 넘겨주기

                if (err) {
                    console.log('쿼리문 실행시 오류 발생');
                    console.dir(err); //디렉토리 형식으로 오류 출력 (계층구조로 출력한다, 객체의 속성을 출력한다, 요소를 json과 같은 트리구조로 출력한다.)
                    res.end();
                    return;
                }

                if (result.length > 0) {
                    console.log('select 성공');
                    for (const location of result) {
                        sidoList.push(location.sido);
                    }
                    res.json({
                        success: true,
                        data: sidoList,
                    });
                } else {
                    console.log('select 실패');
                    res.json({
                        success: false,
                        reason: 'no_data',
                        data: false,
                    });
                }
            }
        );
    });
};

module.exports = getAllSidoList;
