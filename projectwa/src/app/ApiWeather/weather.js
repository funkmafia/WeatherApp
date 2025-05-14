import axios from "axios";
const weatherUrl = "https://api.open-meteo.com/v1/forecast";

// method -1
export default class ApiWeather {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }

  async getWeatherData(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    try {
      const response = await axios.get(
        `${weatherUrl}/?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code,rain,showers,snowfall,is_day&daily=sunrise,sunset&timezone=auto`
      );
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }

  async getDailyWeatherData(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    try {
      const response = await axios.get(
        `${weatherUrl}/?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
      );
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }
}

// Method 1 -
// Checks if HTTP response status is within the range of 200-299 (success codes)
// If not, throws error, standard stuff.
// Why async, just ensures the method waits for the response before proceeding.

// Method 2 -

// Method 3 -
// Fetches weather based on the city name
// Uses axios.get to send a GET request with the city name as a parameter
// Why we are using parameters? makes the function flexible for various city names, uses object destructuring to allow input modification
