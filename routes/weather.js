const router = require('express').Router();
const fetch = require('node-fetch');
const OWN_API_KEY = process.env.OWM_API_KEY || 'CHANGE_ME';

router.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send({
      error: 'Bad Request',
      message: 'Please provide a "city" query parameter',
    });
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OWN_API_KEY}`;
  try {
    const {
      name,
      main: {
        temp: currentTemperature,
        feels_like: feelTemperature,
        temp_min: minTemperature,
        temp_max: maxTemperature,
        pressure,
        humidity,
      },
      weather: [{ description: clouds }],
      wind,
    } = await (await fetch(url)).json();

    // Bit of beautified mapping
    const responseBody = {
      city: name,
      temperature: {
        current: currentTemperature,
        feels: feelTemperature,
        minimum: minTemperature,
        maximum: maxTemperature,
      },
      pressure,
      humidity,
      clouds,
      wind,
    };

    console.log(responseBody);
    res.status(200).send(responseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: 'Internal Server Error',
      message: 'Failed to request weather data',
    });
  }
});

module.exports = router;
