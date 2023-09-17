const connectToDatabase = require('../config/database-pool.js');

//서버 개발자용 데베에 행정구역 데이터 값 저장하기 위한 함수
const addAdministrativeDistrict = async () => {
    const db = await connectToDatabase();

    const dataToInsert = {
        _id: 12,
        city: '충청남도',
        districts: [
            '천안시',
            '공주시',
            '보령시',
            '아산시',
            '서산시',
            '논산시',
            '계룡시',
            '당진시',
            '금산군',
            '부여군',
            '서천군',
            '청양군',
            '홍성군',
            '예산군',
            '태안군',
        ],
    };

    try {
        db.collection('AdministrativeDistrict').insertOne(dataToInsert);
        console.log('저장 완료');
        //커낵션 닫을 필요 없음 몽고디비 드라이버가 내부적으로 커넥션 풀링을 관리하고 insertone함수 호출 후 자동으로 커넥션을 반환하고 닫음
    } catch (error) {
        console.error('Error inserting document:', error);
        res.json({
            success: false,
            error: `데이터 베이스 저장 실패, 에러코드: ${error}`,
        });
    }
};

addAdministrativeDistrict();
