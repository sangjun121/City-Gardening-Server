const express = require('express');
const router = express.Router();
const multer = require('multer');
const connectToDatabase = require('../../config/database-pool');
const upload = require('../../config/imageUploader');

router.post('/register', upload.single('images'), async (req, res) => {
    //오염지역 등록한 사용자이름도 추가

    const paramDetailDescription = req.body.detailDescription;
    const paramLatitude = req.body.latitude;
    const paramLongitude = req.body.longitude;
    const paramPollutionProgress = req.body.pollutionProgress;

    //1. 클라이언트에서 보낸 이미지 데이터 저장
    const landData = {
        detailDescription: paramDetailDescription,
        latitude: paramLatitude,
        longitude: paramLongitude,
        pollutionProgress: paramPollutionProgress,
    };

    console.log(req.file);

    // const db = await connectToDatabase();
    // db.collection('polluctionLandInformation').insertOne(landData);

    // try {
    //     db.collection('polluctionLandInformation').insertOne(landData);
    //     console.log('저장 완료');
    //     res.json({ success: true, description: '오염구역 등록 완료' });
    //     //커낵션 닫을 필요 없음 몽고디비 드라이버가 내부적으로 커넥션 풀링을 관리하고 insertone함수 호출 후 자동으로 커넥션을 반환하고 닫음
    // } catch (error) {
    //     console.error('Error inserting document:', error);
    //     res.json({
    //         success: false,
    //         error: `오염구역 데이터 베이스 저장 실패, 에러코드: ${error}`,
    //     });
    // }
});

module.exports = router;
