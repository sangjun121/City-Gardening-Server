const connectToDatabase = require('../../config/database-pool.js');

const resultObject = undefined;
const readData = { findOne };

//1. findOneMethod
const findOne = async (collectionName, option, callback = null) => {
    const db = await connectToDatabase(); //데이터 베이스 커넥션 받아오기

    try {
        if (callback)
            //콜백함수가 있을 때
            resultObject = await db
                .collection(collectionName)
                .findOne(option, callback);
        //원하는 데이터 찾기
        else {
            //콜백함수가 없을 때
            resultObject = await db.collection(collectionName).findOne(option); //원하는 데이터 찾기
        }
        //커낵션 닫을 필요 없음 몽고디비 드라이버가 내부적으로 커넥션 풀링을 관리하고 insertone함수 호출 후 자동으로 커넥션을 반환하고 닫음
        return resultObject;
    } catch (error) {
        //쿼리문 실행 실패시
        console.error('Error finding document:', error);
        resultObject = { error: 'Error finding document' };
        return resultObject;
    }
};

module.exports = { readData };
