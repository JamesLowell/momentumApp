// OpenWeatherMap API key
const apiKey = "3d12cd99ab02976545944c95dfa7eb0f";

// Function to get the user's current location and fetch weather data
function getCurrentLocationAndFetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await fetch(reverseGeocodingUrl);

        if (response.ok) {
          const data = await response.json();
          const cityName = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.locality || "Unknown";

          document.querySelector(".location").textContent = cityName;
          fetchWeatherData(cityName);
        } else {
          console.error(`Error: Unable to fetch location data. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error(`An error occurred while fetching location data: ${error}`);
      }
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Function to fetch weather data for a specific city and update the UI
async function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      const temperatureCelsius = Math.round(data.main.temp - 273.15);
      const weatherIcon = data.weather[0].icon;

      document.getElementById("temperature").textContent = `${temperatureCelsius}°C`;
      document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    } else {
      console.error(`Error: Unable to fetch data for ${cityName}. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching weather data: ${error}`);
  }
}

// Call the function to get the user's location and fetch weather data
getCurrentLocationAndFetchWeather();