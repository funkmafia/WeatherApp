import axios from "axios"; // axios offers better error handling and cleaner syntax compared to fetch
const weatherUrl = "https://api.open-meteo.com/v1";

// method -1
export default class ApiWeather {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }

  // method 2 -
  async getWeatherData(latitude, longitude, endpoint, params = {}) {
    try {
      const response = await axios.get(`${weatherUrl}/${endpoint}`, {
        params: {
          latitude,
          longitude,
          ...params,
        },
      });
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error(`Error receiving weather forecast data`);
    }
  }

  // method 3 -
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

// Method 1 -
// Checks if HTTP response status is within the range of 200-299 (success codes)
// If not, throws error, standard stuff.
// Why async, just ensures the method waits for the response before proceeding.

// Method 2 -
// Double check why the syntax is this way (universal meaning)
// Fetches the weather data from the given API endpoint, using lat and long
// ... params allows extra parameters ?? called the spread operator, takes remianing key-values pairs from the params and merges them into the object being constructred.
// Why the try-catch - catches the netwrok errors or bad api responses, allows user-friendly messaging

// Method 3 -
// Fetches weather based on the city name
// Uses axios.get to send a GET request with the city name as a parameter
// Why we are using parameters? makes the function flexible for various city names, uses object destructuring to allow input modification
