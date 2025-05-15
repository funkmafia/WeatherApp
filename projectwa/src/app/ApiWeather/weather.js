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
        `${weatherUrl}/?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
      );
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }
}
