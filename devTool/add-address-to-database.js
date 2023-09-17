const connectToDatabase = require('../config/database-pool.js');

//서버 개발자용 데베에 행정구역 데이터 값 저장하기 위한 함수
const addAdministrativeDistrict = async () => {
    const db = await connectToDatabase();

    const dataToInsert = {
        _id: 14,
        city: '전라남도',
        districts: [
            '목포시',
            '여수시',
            '순천시',
            '나주시',
            '광양시',
            '담양군',
            '곡성군',
            '구례군',
            '고흥군',
            '보성군',
            '화순군',
            '장흥군',
            '강진군',
            '해남군',
            '영암군',
            '무안군',
            '함평군',
            '영광군',
            '장성군',
            '완도군',
            '진도군',
            '신안군',
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
