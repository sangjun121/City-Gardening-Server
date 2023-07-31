const request = require('request');
const xmlToJsonConverter = require('xml-js');
const dotenv = require('dotenv');
dotenv.config();

function getVolunteerInfo(locationCode) {
    const volunteerList = []; //봉사활동 결과 리스트
    let { sidoCode, gugunCode } = locationCode;
    const endPointOfGetAreaCode = process.env.OPENAPI_VOLUNTEER_INFO_END_POINT;

    sidoCode = Number(sidoCode); //문자열 숫자형으로 변경
    gugunCode = Number(gugunCode);

    const requestOptions = {
        //일단 시도, 구군 정보 모두 전체 값이 아닐 때
        url: endPointOfGetAreaCode,
        qs: {
            schSido: sidoCode,
            schSign1: gugunCode,
        },
    };

    return new Promise((resolve, reject) => {
        request(requestOptions, function (error, response, body) {
            if (error) {
                console.log('실패');
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

                const items = resultByObject.response.body.items.item;
                for (const item of items) {
                    const volunteerInfo = {
                        programTitle: item.progrmSj._text,
                        centerName: item.nanmmbyNm._text,
                        programStartDate: item.progrmBgnde._text,
                        programEndDate: item.progrmEndde._text,
                    };
                    volunteerList.push(volunteerInfo);
                }

                resolve(volunteerList);
            }
        });
    });
}

module.exports = getVolunteerInfo;
