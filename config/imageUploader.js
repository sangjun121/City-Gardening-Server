const fs = require('fs');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: process.env.BUCKET_KEY + 'section1',
};
