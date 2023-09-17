const connectToDatabase = require('../config/database-pool.js');

//서버 개발자용 데베에 행정구역 데이터 값 저장하기 위한 함수
const addAdministrativeDistrict = async () => {
    const db = await connectToDatabase();

    const dataToInsert = {
        _id: 10,
        city: '강원특별자치도',
        districts: [
            '춘천시',
            '원주시',
            '강릉시',
            '동해시',
            '태백시',
            '속초시',
            '삼척시',
            '홍천군',
            '횡성군',
            '영월군',
            '평창군',
            '정선군',
            '철원군',
            '화천군',
            '양구군',
            '인제군',
            '고성군',
            '양양군',
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
