const connectToDatabase = require('../config/database-pool.js');

//회원가입 중복 처리 막기
const adduser = async (req, res) => {
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
};

module.exports = adduser;
