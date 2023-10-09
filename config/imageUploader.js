const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({ region: 'ap-northeast-2' });
const dotenv = require('dotenv');
dotenv.config();

const s3 = new S3Client({
    //aws 구성정보 저장
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

module.exports = upload;
