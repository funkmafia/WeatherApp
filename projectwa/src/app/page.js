"use client";
import { useState, useEffect } from "react";
import ApiWeather from "./ApiWeather/weather";

const apiWeather = new ApiWeather();

export default function Home() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities", error.message);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiWeather.getWeatherByFilter({ city });
        console.log("API Response", response);
        setWeather(response.data);
      } catch (error) {
        console.error("Error receiving weather forecast data", error);
        setError(error.message ?? "An unexpected error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select a city</option>
        {cities.map((item) => (
          <option key={item} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <h2>{weather.name}</h2>
      <p>{weather.description}</p>
      <p>Temperature: {weather.temperature} °C </p>
    </div>
  );
}

// getWeatherData - when we have precise coordinates
// getWeatherByFilter - when the user choices the city or enters the city name??

// changed city to item.name because that only works if API returns a list of city names, not objects.
// I believe we are obtaining objects based on the long and latt basis.
