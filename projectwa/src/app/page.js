"use client";
import { useState, useEffect } from "react";
import ApiWeather from "./ApiWeather/weather";
import { weatherData } from "../../data/data";
import { Newsreader } from "next/font/google";

const cities = [
  {
    name: "London, UK",
    latitude: "51.5072",
    longitude: "0.1276",
  },
  {
    name: "Tokyo, Japan",
    latitude: "35.6764",
    longitude: "139.839478",
  },
  {
    name: "Paris, France",
    latitude: "48.8575",
    longitude: "2.3514",
  },
  {
    name: "Washington DC, United States America",
    latitude: "38.9072",
    longitude: "77.0369",
  },
  {
    name: "Madrid, Spain",
    latitude: "40.4167",
    longitude: "-3.7037",
  },
  {
    name: "Cairo, Egypt",
    latitude: "30.0444",
    longitude: "31.2357",
  },
  {
    name: "Brasilia, Brazil",
    latitude: "-15.7975",
    longitude: "-47.8919",
  },
  {
    name: "New Dehli, India",
    latitude: "28.6139",
    longitude: "77.2088",
  },
];

const apiWeather = new ApiWeather(); //This instance is created from the apiweateher class from weather.js file
// why - need this instance to call methods like getCities() and getWeatherByFilter() later in the cde.

export default function Home() {
  const [city, setCity] = useState(cities[0]); // the selected city from the dropdown
  const [weather, setWeather] = useState(null); // the weather data returned from the api
  const [loading, setLoading] = useState(false); // a boolean to track if data is being fetched
  const [error, setError] = useState(null);
  const [daily, setDaily] = useState([]); // empty array

  // a string that holds error messages
  // important !! the above states allow to update UI when data changes

  // using the useEffect to fetch the list of cities only once when the page loads
  // why - to populate the dropdown when the component loads
  // useEffect doesnt directly support async, so always define an async function inside and call the function.
  // WORK ON CALLING FUNCTIONS
  // useEffect(() => {
  //   // fetching cities when the page loads !!
  //   const fetchCities = async () => {
  //     try {
  //       const response = await apiWeather.getCities();
  //       setCities(response.data.cities);
  //     } catch (error) {
  //       console.error("Error fetching cities", error.message);
  //       setError("Failed to load cities");
  //     }
  //   };
  //   fetchCities();
  // }, []); // empty array means run only once

  // When the selected city changes, the effect runs to fetch the weather dta
  // react updates the component when the city state changes
  // why - to manage the uI when the data is being fetched.
  useEffect(() => {
    const fetchWeather = async () => {
      // fetching weather once the city changes!!
      setLoading(true); // starts loaiding
      setError(null); // clears any previous errors
      try {
        const response = await apiWeather.getWeatherData(
          city.latitude,
          city.longitude
        );
        const secondResponse = await apiWeather.getDailyWeatherData(
          city.latitude,
          city.longitude
        );
        console.log("secondResponse", secondResponse);
        console.log("API Response", response); // store the weather data.
        setWeather(response.data);
        setDaily(secondResponse.data);
      } catch (error) {
        console.error("Error receiving weather forecast data", error);
        setError(error.message ?? "An unexpected error occured");
      } finally {
        setLoading(false); // stop loading
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]); // run when 'city' changes

  useEffect(() => {
    console.log(weatherData[weather?.current?.weather_code]?.day?.image);
  }, [weather]);

  // displaying the UI !!
  // whats inteded - dropdown to select a city, loading message whilst fetching data, error if something wrong, weather data displayed when fetched.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-blue-300">
      <select
        value={city.name}
        onChange={(e) =>
          setCity(cities.find((item) => item.name === e.target.value))
        }
        className="mt-4 mb-10 p-2 border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out"
      >
        {cities.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {loading && (
        <p className="text-center text-gray-600 mb-4">
          Loading weather data...
        </p>
      )}
      <div className="bg-white rounded-lg shadow-lg w-80 text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-transform duration-200 ease-in-out">
        <h2 className="text-xl font-semibold mb-2 mt-4">
          {city.name ?? "City not available"}
          <a
            href={`https://www.google.com/maps/@${city.latitude},${city.longitude},10z`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm hover:underline mt-2 block"
          >
            View on Map
          </a>
        </h2>
        <p className="text-gray-600 mb-2">
          Local Time:{" "}
          {new Date().toLocaleTimeString("en-US", {
            timeZone: city.timezone,
          }) ?? "N/A"}
        </p>
        <p className="text-gray-700 mb-1">
          {weatherData[weather?.current?.weather_code]?.day?.description ??
            "No description available"}
        </p>
        <img
          className="w-24 h-24 mx-auto mt-4 mb-4 hover:scale-[1.2] transition-transform duration-200 ease-in-out"
          src={weatherData[weather?.current?.weather_code]?.day?.image}
          alt="Weather Icon"
        />
        <p className="text-gray-600">
          Temperature: {weather?.current?.temperature_2m ?? "N/A"} °C
        </p>
        <p className="text-gray-600">
          Wind Speed: {weather?.current?.wind_speed_10m ?? "N/A"}
        </p>
        <p className="text-gray-600">
          Sunrise: {weather?.daily.sunrise[0].slice(-5) ?? "N/A"}
        </p>
        <p className="text-gray-600 mb-4">
          Sunset: {weather?.daily.sunset[0].slice(-5) ?? "N/A"}
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg w-full max-w-3xl text-center p-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Temperature Over the Next 7 Days
        </h2>

        <div className="flex space-x-3 overflow-x-auto p-2 bg-white rounded-xl shadow-inner">
          {daily?.daily?.temperature_2m_max.map((item, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const futureDate = date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            });
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 min-w-[80px] bg-gradient-to-t from-gray-50 to-gray-100 rounded-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <p className="text-md font-semibold text-gray-600">
                  {futureDate}
                </p>
                <p className="text-l font-bold text-gray-900">{item} °C</p>
              </div>
            );
          }) ?? "N/A"}
        </div>
      </div>

      <footer className="text-center mt-8 text-gray-600">
        Powered by FunkMafia x JDC x Wahab
        <br />
        <a
          href="https://github.com/funkmafia/WeatherApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:underline"
        >
          View Project on GitHub
        </a>
      </footer>
    </div>
  );
}

// getWeatherData - when we have precise coordinates
// getWeatherByFilter - when the user choices the city or enters the city name??

// changed city to item.name because that only works if API returns a list of city names, not objects.
// I believe we are obtaining objects based on the long and latt basis.

// weather?.name ?? "City not available"
// weather?.description ?? "No information available"
// Temperature: {weather?. tempature ?? "N/A"}

// == overview for indepth understanding == //
/* using a class instance (apiWeather) to fetch data, good for keeping api logic seperate from ui 
  - states are used to manage the current city, weather data, loading state, erros 
*/

// remember the empty array [] at the end of the basic styanx of a useEffect means it only runs once(when the page loads)
// try-catch handles errors without crashing the app
// await - waits for the response before moving on.

/*   <select value={city} onChange={(e) => setCity()}>
      <option value="">Select a city</option>
      {cities.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select> */

// cities.find((item) etc ) - this method loops through the cities array to find the object whose name mataches the selected value
// find key word is a method to find the entire city object (not just the name)
// setCity(..) this updats the city state with the selected city object
// cities.map = iterates over each city in the cities array
// for each city object (item): an option element created, the key prop helps react keep track of list items / value={item.name} sets teh value of the option to the city name
// why use key - helps react improve performance by allowing reac to detect changes more efficiently
// "the key should be a unique identifier" with city names being the unique names in the list.

// API DATA STRUCTURE IF WE GET TYPICAL WEATHER API RESONSE LIKE BELOW; HENCE WHY I ADDED .LOCATION? AND .CURRENT?
{
  /* 
  {
  "location": {
    "name": "London",
    "latitude": "51.5072",
    "longitude": "-0.1276",
    "sunrise": "06:00",
    "sunset": "18:00"
  },
  "current": {
    "temperature": 15,
    "wind_speed": 5,
    "humidity": 72,
    "weather_code": 800,
    "weather_description": ["Clear sky"]
  }
}
  */
}
