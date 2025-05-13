const weatherData = {
  0: {
    day: {
      description: "Sunny",
      image: "https://i.ibb.co/vDSPDDc/sun-256.png",
    },
    night: {
      description: "Clear",
      image: "https://i.ibb.co/mvzgzvn/moon-256.png",
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      image: "https://i.ibb.co/D5b253k/sun-4-256.png",
    },
    night: {
      description: "Mainly Clear",
      image: "https://i.ibb.co/2Nd1bTP/moon-3-256.png",
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      image: "https://i.ibb.co/p6DH6xy/partly-cloudy-day-256.png",
    },
    night: {
      description: "Partly Cloudy",
      image: "https://i.ibb.co/C5MryFd/partly-cloudy-night-256.png",
    },
  },
  3: {
    day: {
      description: "Cloudy",
      image: "https://i.ibb.co/Yh95P3s/cloudy-256.png",
    },
    night: {
      description: "Cloudy",
      image: "https://i.ibb.co/Yh95P3s/cloudy-256.png",
    },
  },
  45: {
    day: {
      description: "Foggy",
      image: "https://i.ibb.co/PWNMNzM/fog-day-256.png",
    },
    night: {
      description: "Foggy",
      image: "https://i.ibb.co/R99P8wH/fog-night-256.png",
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      image: "https://i.ibb.co/PWNMNzM/fog-day-256.png",
    },
    night: {
      description: "Rime Fog",
      image: "https://i.ibb.co/R99P8wH/fog-night-256.png",
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
    night: {
      description: "Light Drizzle",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
  },
  53: {
    day: {
      description: "Drizzle",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
    night: {
      description: "Drizzle",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
    night: {
      description: "Heavy Drizzle",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Light Freezing Drizzle",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Freezing Drizzle",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  61: {
    day: {
      description: "Light Rain",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
    night: {
      description: "Light Rain",
      image: "https://i.ibb.co/pbbyYJD/little-rain-256.png",
    },
  },
  63: {
    day: {
      description: "Rain",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
    night: {
      description: "Rain",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
    night: {
      description: "Heavy Rain",
      image: "https://i.ibb.co/VmqF6qF/rain-256.png",
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Light Freezing Rain",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Freezing Rain",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      image: "https://i.ibb.co/dtsK2SN/little-snow-256.png",
    },
    night: {
      description: "Light Snow",
      image: "https://i.ibb.co/dtsK2SN/little-snow-256.png",
    },
  },
  73: {
    day: {
      description: "Snow",
      image: "https://i.ibb.co/7R9nc6D/snow-256.png",
    },
    night: {
      description: "Snow",
      image: "https://i.ibb.co/7R9nc6D/snow-256.png",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      image: "https://i.ibb.co/7R9nc6D/snow-256.png",
    },
    night: {
      description: "Heavy Snow",
      image: "https://i.ibb.co/7R9nc6D/snow-256.png",
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      image: "https://i.ibb.co/dtsK2SN/little-snow-256.png",
    },
    night: {
      description: "Snow Grains",
      image: "https://i.ibb.co/dtsK2SN/little-snow-256.png",
    },
  },
  80: {
    day: {
      description: "Light Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
    night: {
      description: "Light Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
  },
  81: {
    day: {
      description: "Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
    night: {
      description: "Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
    night: {
      description: "Heavy Showers",
      image: "https://i.ibb.co/XLD8Jdv/rainy-weather-256.png",
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Light Snow Showers",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
    night: {
      description: "Snow Showers",
      image: "https://i.ibb.co/J7HW4yJ/sleet-256.png",
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      image: "https://i.ibb.co/7KmfxsD/cloud-lighting-256.png",
    },
    night: {
      description: "Thunderstorm",
      image: "https://i.ibb.co/7KmfxsD/cloud-lighting-256.png",
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      image: "https://i.ibb.co/0Vy6bft/hail-256.png",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: "https://i.ibb.co/0Vy6bft/hail-256.png",
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      image: "https://i.ibb.co/0Vy6bft/hail-256.png",
    },
    night: {
      description: "Thunderstorm With Hail",
      image: "https://i.ibb.co/0Vy6bft/hail-256.png",
    },
  },
};

export { weatherData };
