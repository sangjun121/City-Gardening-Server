const getLocationCode = require('./openAPI/get-location-code-by-openAPI');
const getVolunteerInfo = require('./openAPI/get-volunteer-info-by-openAPI');

async function getVolunteerList(req, res) {
    const locationSido = req.body.sido;
    const locationGugun = req.body.gugun;

    const locationCode = await getLocationCode(locationSido, locationGugun);
    const volunteerList = await getVolunteerInfo(locationCode);

    res.json({ success: true, data: volunteerList });
}

module.exports = getVolunteerList;
