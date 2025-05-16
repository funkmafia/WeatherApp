"use client";

import { useState, useEffect } from "react";
import ApiWeather from "./ApiWeather/weather";
import { weatherData } from "../../data/data";

function celsiusToFahrenheit(celsius) {
  if (typeof celsius !== "number" || isNaN(celsius)) {
    return NaN;
  }
  return (celsius * 9) / 5 + 32;
}

export { celsiusToFahrenheit };

const cities = [
  {
    name: "London, UK",
    latitude: "51.5072",
    longitude: "0.1276",
    timezone: "Europe/London",
  },
  {
    name: "Tokyo, Japan",
    latitude: "35.6764",
    longitude: "139.839478",
    timezone: "Asia/Tokyo",
  },
  {
    name: "Paris, France",
    latitude: "48.8575",
    longitude: "2.3514",
    timezone: "Europe/Paris",
  },
  {
    name: "Washington DC, United States America",
    latitude: "38.9072",
    longitude: "77.0369",
    timezone: "America/New_York",
  },
  {
    name: "Madrid, Spain",
    latitude: "40.4167",
    longitude: "-3.7037",
    timezone: "Europe/Madrid",
  },
  {
    name: "Cairo, Egypt",
    latitude: "30.0444",
    longitude: "31.2357",
    timezone: "Africa/Cairo",
  },
  {
    name: "Brasilia, Brazil",
    latitude: "-15.7975",
    longitude: "-47.8919",
    timezone: "America/Sao_Paulo",
  },
  {
    name: "New Dehli, India",
    latitude: "28.6139",
    longitude: "77.2088",
    timezone: "Asia/Kolkata",
  },
];

const apiWeather = new ApiWeather();

export default function Home() {
  const [city, setCity] = useState(cities[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [daily, setDaily] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiWeather.getWeatherData(
          city.latitude,
          city.longitude
        );
        const secondResponse = await apiWeather.getDailyWeatherData(
          city.latitude,
          city.longitude
        );
        //   const thirdResponse = await apiWeather.getFutureWeatherData(
        //   city.latitude,
        // city.longitude
        // );

        console.log("secondResponse", secondResponse);
        console.log("API Response", response);

        setWeather(response.data);
        setDaily(secondResponse.data);
        //      setFuture(thirdResponse.data);
      } catch (error) {
        console.error("Error receiving weather forecast data", error);
        setError(error.message ?? "An unexpected error occured");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const handlePrevDay = () => {
    setCurrentDay((prev) =>
      prev > 0 ? prev - 1 : daily?.daily?.temperature_2m_max.length - 1
    );
  };

  const handleNextDay = () => {
    setCurrentDay((prev) =>
      prev < daily?.daily?.temperature_2m_max.length - 1 ? prev + 1 : 0
    );
  };

  useEffect(() => {
    console.log(weatherData[weather?.current?.weather_code]?.day?.image);
  }, [weather]);

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
      <div className="bg-white rounded-lg shadow-lg h-auto text-center p-8 sm:w-full md:w-96 hover:shadow-2xl hover:scale-[1.05] transition-transform duration-300 ease-in-out">
        {" "}
        <div className="flex items-center justify-center gap-4 my-4">
          <button
            onClick={handlePrevDay}
            className="p-2 bg-gray-100 hover:bg-gray-300"
          >
            ←
          </button>
          <span className="text-xl font-semibold">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            })}
          </span>
          <button
            onClick={handleNextDay}
            className="p-2  bg-gray-100 hover:bg-gray-300"
          >
            →
          </button>
        </div>
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
          Time in {city.name}:{" "}
          {new Date().toLocaleTimeString("en-GB", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }) ?? "N/A"}
        </p>
        <p className="text-gray-700 mb-1 font-semibold">
          {weatherData[weather?.current?.weather_code]?.day?.description ??
            "No description available"}
        </p>
        <img
          className="w-24 h-24 mx-auto mt-4 mb-4 hover:scale-[1.2] transition-transform duration-200 ease-in-out"
          src={weatherData[weather?.current?.weather_code]?.day?.image}
          alt="Weather Icon"
        />
        <p className="text-gray-600 font-semibold">
          Temperature: {weather?.current?.temperature_2m ?? "N/A"} °C
        </p>
        <p className="text-gray-600">
          Wind Speed: {weather?.current?.wind_speed_10m ?? "N/A"}kmh
        </p>
        <p className="text-gray-600">
          Sunrise: {weather?.daily.sunrise[0].slice(-5) ?? "N/A"}
        </p>
        <p className="text-gray-600 mb-4">
          Sunset: {weather?.daily.sunset[0].slice(-5) ?? "N/A"}
        </p>
        <div className="collapsible">
          <input
            type="checkbox"
            id="collapsible"
            className="toggle hidden peer"
          />
          <label
            htmlFor="collapsible"
            className="inline-block bg-blue-200 text-gray-900 font-semibold px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-450 hover:shadow-md hover:scale-105 mt-4"
          >
            More Weather Details
          </label>
          <div className="max-h-0 overflow-hidden peer-checked:max-h-40 transition-max-height duration-300p-2 rounded">
            <p className="text-gray-600 mt-6">
              UV Index: {weather?.daily?.uv_index_max[0] ?? "N/A"}
            </p>
            <p className="text-gray-600">
              Wind Direction: {weather?.current?.wind_direction_10m ?? "N/A"}°
            </p>
            <p className="text-gray-600">
              Humidity: {weather?.current?.relative_humidity_2m ?? "N/A"}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg w-full max-w-4xl text-center p-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
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
            console.log(index);
            console.log(daily?.daily);

            const futureWeatherCode = daily?.daily?.weather_code[index];

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 min-w-[85px] bg-gradient-to-t from-gray-50 to-gray-100 rounded-md shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <p className="text-md font-semibold text-gray-600">
                  {futureDate}
                </p>
                <p className="text-l font-bold text-gray-900">{item} °C</p>
                <img
                  className=""
                  src={
                    weatherData[futureWeatherCode]?.day?.image ??
                    weatherData[0].day.image
                  }
                  alt="Weather Icon"
                />
              </div>
            );
          }) ?? "N/A"}
        </div>
      </div>

      <footer className="text-center mt-8 text-gray-600">
        Powered by FunkMafia x JDC
        <br />
        <a
          href="https://github.com/funkmafia/WeatherApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:underline"
        >
          View Project on GitHub
        </a>
        <a
          href="https://github.com/funkmafia/WeatherApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:underline"
        >
          <i className="fab fa-github text-xl text-gray-800"></i>
        </a>
      </footer>
    </div>
  );
}
