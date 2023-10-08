const express = require('express');
const router = express.Router();
const multer = require('multer');
const connectToDatabase = require('../../config/database-pool');

const upload = multer({
    dest: 'upload/',
});

router.post('/register', upload.single('images'), async (req, res) => {
    //오염지역 등록한 사용자이름도 추가

    const paramDetailDescription = req.body.detailDescription;
    const paramLatitude = req.body.latitude;
    const paramLongitude = req.body.longitude;
    const paramPollutionProgress = req.body.pollutionProgress;

    const landData = {
        detailDescription: paramDetailDescription,
        latitude: paramLatitude,
        longitude: paramLongitude,
        pollutionProgress: paramPollutionProgress,
    };
    console.log(req.file);
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;
