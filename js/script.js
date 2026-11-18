const apiKey = "eabf344a71e9d20cf8bee1bd579e82f7";
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  const loading = document.getElementById("loading");
  const weatherInfo = document.getElementById("weatherInfo");
  const error = document.getElementById("error");

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  loading.classList.remove("hidden");
  weatherInfo.classList.add("hidden");
  error.classList.add("hidden");

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(cityName)}` +
      `&appid=${apiKey}` +
      `&units=imperial`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("cityName").textContent =
      `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
      `${Math.round(data.main.temp)}°F`;

    document.getElementById("weatherCondition").textContent =
      `Condition: ${data.weather[0].description}`;

    document.getElementById("humidity").innerHTML =
      `<i class="bi bi-droplet-fill text-primary"></i>
       Humidity: ${data.main.humidity}%`;

    document.getElementById("windSpeed").innerHTML =
      `<i class="bi bi-wind text-info"></i>
       Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.classList.remove("hidden");
  } catch (errorMessage) {
    error.classList.remove("hidden");
    console.error(errorMessage);
  } finally {
    loading.classList.add("hidden");
  }
}
