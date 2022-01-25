const fetch = require("axios");

exports.handler = async (event, context) => {
  try {
    const { query } = event.queryStringParameters;
    let response = await fetch(
      `${process.event.API_URL}=${process.event.WEATHER_API_KEY}&q=${query}`
    );
    let weatherData = response.weatherData;
    return {
      statusCode: 200,
      body: JSON.stringify({
        weatherData,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: err.message,
      }),
    };
  }
};