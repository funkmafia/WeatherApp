"use client";
import { useState, useEffect } from "react";
import ApiWeather from "./ApiWeather/weather";
import { weatherData } from "../../data/data";

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
    longitude: "3.7033",
  },
  {
    name: "Cairo, Egypt",
    latitude: "30.0444",
    longitude: "31.2357",
  },
  {
    name: "Brasilia, Brazil",
    latitude: "15.7975",
    longitude: "47.8919",
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
  const [error, setError] = useState(null); // a string that holds error messages
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
        console.log("API Response", response); // store the weather data.
        setWeather(response.data);
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
    <div>
      <select
        value={city.name}
        onChange={(e) =>
          setCity(cities.find((item) => item.name === e.target.value))
        }
      >
        {cities.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {loading && <p>Loading weather data...</p>}
      <div>
        <h2>{weather?.location?.name ?? "City not available"}</h2>
        <p>
          {weather?.current?.weather_description?.[0] ??
            "No description available"}
        </p>
        <p>Temperature: {weather?.current?.temperature ?? "N/A"} °C</p>
        <p>Wind Speed: {weather?.current?.wind_speed ?? "N/A"}</p>
        <p>Humidity: {weather?.current?.humidity ?? "N/A"}</p>
        <p>Sunrise: {weather?.location?.sunrise ?? "N/A"}</p>
        <p>Sunset:{weather?.location?.sunset ?? "N/A"}</p>
        <img
          src={weatherData[weather?.current?.weather_code]?.day?.image}
          alt="Weather Icon"
        />
      </div>
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
