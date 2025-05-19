"use client";
import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-blue-300">
      <select
        value={city.name}
        onChange={(e) =>
          setCity(cities.find((item) => item.name === e.target.value))
        }
        className="w-96 h-10 mt-4 mb-6 p-2 border border-gray-500 rounded-lg bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out"
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
    </div>
  );
};
