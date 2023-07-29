const dbPool = require('../../config/database-pool.js');

const getGugunList = (req, res) => {
    const gugunList = [];
    const sido = req.body.sido;

    dbPool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            console.log('커넥션 오류');
            res.end();
            return;
        }
        console.log('데이터 베이스 연결 끈 성공');

        const exec = conn.query(
            'SELECT gugun FROM locations_gugun WHERE sido = ? ORDER BY id ASC;',
            [sido],
            (err, result) => {
                conn.release();

                if (err) {
                    console.log('쿼리문 실행 실패');
                    console.dir(err);
                    res.end();
                    return;
                }

                if (result.length > 0) {
                    console.log('select 성공!');
                    for (const location of result) {
                        gugunList.push(location.gugun);
                    }
                    res.json({
                        success: true,
                        data: gugunList,
                    });
                } else {
                    console.log('selct 결과 없음');
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

module.exports = getGugunList;
