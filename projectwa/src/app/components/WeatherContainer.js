import axios from "axios";
const weatherUrl = "https://api.open-meteo.com/v1/forecast";

export default class ApiWeather {
  async getWeatherData(latitude, longitude) {
    try {
      const response = await axios.get(
        `${weatherUrl}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset,uv_index_max&hourly=temperature_2m&timezone=auto`
      );
      console.log(`Fetched data for location: (${latitude}, ${longitude})`);
      console.log("Number of days returned:", response.data.daily.time.length);
      console.log(
        "Hourly temperature data:",
        response.data.hourly.temperature_2m
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error receiving weather forecast data: ${error.message}`);
      throw new Error("Unable to retrieve weather data.");
    }
  }
}
