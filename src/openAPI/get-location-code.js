const request = require('request');
const xmlToJsonConverter = require('xml-js');
const dotenv = require('dotenv');
dotenv.config();

const getLocationCode = (req, res) => {
    let sidoCode, gugunCode;
    const endPointOfGetAreaCode = process.env.OPENAPI_LOCATION_CODE_END_POINT;

    const paramSido = req.body.sido;
    const paramGugun = req.body.gugun;

    if (paramSido === '전체') {
        //지역 정보 입력 없이 "전체"인 경우
        sidoCode = null;
        gugunCode = null;
        return;
    }

    if (gugunCode === '전체') {
        //구,군 코드가 "전체"인 경우
        return;
    }

    const requestOptions = {
        url: endPointOfGetAreaCode,
        qs: {
            schSido: paramSido,
            schGugun: paramGugun,
        },
    };

    request(requestOptions, function (error, response, body) {
        if (error) {
            console.log(error);
            return;
        }

        if (response.statusCode == 200) {
            let resultByXML = body;
            let resultByJSON = xmlToJsonConverter.xml2json(resultByXML, {
                compact: true,
                spaces: 4,
            });
            console.log(resultByJSON);
        }
    });
};

module.exports = getLocationCode;
