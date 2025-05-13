import axios from "axios";
const weatherUrl = "https://api.open-meteo.com/v1/forecast";

export default class ApiWeather {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }

  async getWeatherData(latitude, longitude) {
    try {
      const response = await axios.get(
        `${weatherUrl}/?latitude=${latitude}&longitude=${longitude}`
      );
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }
  async getWeatherByFilter({ city } = {}) {
    try {
      const response = await axios.get(`${weatherUrl}/search`, {
        params: {
          name: city,
        },
      });
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }
}
