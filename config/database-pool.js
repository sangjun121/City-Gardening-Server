const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const dbURL = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.ncbityo.mongodb.net/?retryWrites=true&w=majority`;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(dbURL);
        const db = client.db('CityGardening');
        return db;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // 에러 처리를 호출하는 코드로 전달
    }
}

module.exports = connectToDatabase;
