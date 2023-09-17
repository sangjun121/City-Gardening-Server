const connectToDatabase = require('../config/database-pool.js');

//서버 개발자용 데베에 행정구역 데이터 값 저장하기 위한 함수
const addAdministrativeDistrict = async () => {
    const db = await connectToDatabase();

    const dataToInsert = {
        _id: 9,
        city: '경기도',
        districts: [
            '수원시',
            '성남시',
            '고양시',
            '용인시',
            '부천시',
            '안산시',
            '안양시',
            '남양주시',
            '화성시',
            '평택시',
            '과천시',
            '시흥시',
            '파주시',
            '의정부시',
            '김포시',
            '광주시',
            '광명시',
            '군포시',
            '이천시',
            '양주시',
            '오산시',
            '구리시',
            '안성시',
            '포천시',
            '의왕시',
            '하남시',
            '여주시',
            '양평군',
            '가평군',
            '연천군',
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
