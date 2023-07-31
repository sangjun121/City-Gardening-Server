const request = require('request');
const xmlToJsonConverter = require('xml-js');
const dotenv = require('dotenv');
dotenv.config();

const locationCode = {}; //텍스트 주소값을 코드로 바꾸고 저장할 객체

const addValueToObject = (sidoCode, gugunCode) => {
    //변수 값들 객체에 추가하는 함수
    locationCode.sidoCode = sidoCode;
    locationCode.gugunCode = gugunCode;
};

function getLocationCode(locationSido, locationGugun) {
    return new Promise((resolve, reject) => {
        let sidoCode, gugunCode;
        const endPointOfGetAreaCode =
            process.env.OPENAPI_LOCATION_CODE_END_POINT;

        if (locationSido === '전체') {
            //지역 정보 입력 없이 "전체"인 경우
            sidoCode = null;
            gugunCode = null;
            addValueToObject(sidoCode, gugunCode);
            return;
        }

        if (locationGugun === '전체') {
            //구,군 코드가 "전체"인 경우

            return;
        }

        //시도, 구군 정보가 둘다 들어왔을 경우 (둘다 전체가 아닐 경우)
        const requestOptions = {
            url: endPointOfGetAreaCode,
            qs: {
                schSido: locationSido,
                schGugun: locationGugun,
            },
        };

        request(requestOptions, function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }

            if (response.statusCode == 200) {
                let resultByXML = body;
                let resultByJSON = xmlToJsonConverter.xml2json(resultByXML, {
                    compact: true,
                    spaces: 4,
                });

                let resultByObject = JSON.parse(resultByJSON); //json형식의 결과 값을 객체로 바꾸기

                sidoCode = resultByObject.response.body.items.item.sidoCd._text; //해당 데이터에 접근
                gugunCode =
                    resultByObject.response.body.items.item.gugunCd._text;

                addValueToObject(sidoCode, gugunCode);
                resolve(locationCode);
            }
        });
    });
}

module.exports = getLocationCode;
