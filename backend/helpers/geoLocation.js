const axios = require('axios');

// Function to get location details from Google Maps API
const getLocationDetails = async (lat, lng) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GEO_LOCATION_KEY}`);
    console.log(response)
  return response.data.results[0].formatted_address;

  } catch (error) {
    console.log(error)
    return 'An error occurred'
  }
};


module.exports = getLocationDetails