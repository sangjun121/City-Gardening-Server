const getLocationCode = require('./openAPI/get-location-code');

async function getVolunteerList(req, res) {
    const locationSido = req.body.sido;
    const locationGugun = req.body.gugun;

    const locationCode = await getLocationCode(locationSido, locationGugun);
    console.log(locationCode);
}

module.exports = getVolunteerList;
