import { getWeather } from "./weatherData.js";

let unitsConverter = (kelvin) => {
  return kelvin - 273;
};
let unit = "C";

function unitsSwitcher() {
  const unitsSwitchContainer = document.querySelector(
    ".units-switch-container"
  );
  const unitsSwitch = document.querySelector(".units-switch");
  unitsSwitchContainer.addEventListener("click", function () {
    if (unitsSwitch.classList.contains("units-F")) {
      unitsSwitch.classList.remove("units-F");
      unit = "C";
      unitsConverter = (kelvin) => {
        return kelvin - 273;
      };
    } else {
      unitsSwitch.classList.add("units-F");
      unit = "F";
      unitsConverter = (kelvin) => {
        return (kelvin - 273) * 1.8 + 32;
      };
    }
    displayData(processData(currentWeatherPromise));
  });
}

function processData(data) {
  let location = data.name;
  let nowTemp =
    Math.floor(unitsConverter(data.main.temp)).toString() + `°${unit}`;
  let lowTemp =
    Math.floor(unitsConverter(data.main.temp_min)).toString() + `°${unit}`;
  let highTemp =
    Math.floor(unitsConverter(data.main.temp_max)).toString() + `°${unit}`;
  let condition = data.weather[0].main;
  let sunriseDateObj = new Date((data.sys.sunrise+data.timezone)*1000);
  let sunriseHour = sunriseDateObj.getUTCHours();
  let sunriseMinutes = sunriseDateObj.getUTCMinutes();
  let sunsetDateObj = new Date((data.sys.sunset+data.timezone)*1000);
  let sunsetHour = sunsetDateObj.getUTCHours();
  let sunsetMinutes = sunsetDateObj.getUTCMinutes();
  let sunrise =
    sunriseHour.toString().padStart(2, "0") +
    ":" +
    sunriseMinutes.toString().padStart(2, "0");
  let sunset =
    sunsetHour.toString().padStart(2, "0") +
    ":" +
    sunsetMinutes.toString().padStart(2, "0");
  return { location, nowTemp, lowTemp, highTemp, condition, sunrise, sunset };
}

function displayData(processedData) {
  const locationText = document.querySelector(".location");
  const nowTempText = document.querySelector(".now-temp");
  const lowTempText = document.querySelector(".low-temp");
  const highTempText = document.querySelector(".hi-temp");
  const conditionText = document.querySelector(".condition");
  const sunriseText = document.querySelector(".sunrise");
  const sunsetText = document.querySelector(".sunset");
  locationText.textContent = processedData.location;
  nowTempText.textContent = processedData.nowTemp;
  lowTempText.textContent = processedData.lowTemp;
  highTempText.textContent = processedData.highTemp;
  conditionText.textContent = processedData.condition;
  sunriseText.textContent = processedData.sunrise;
  sunsetText.textContent = processedData.sunset;
}

unitsSwitcher();
let currentWeatherPromise = undefined;
const searchBar = document.querySelector("#search");
searchBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let locationString = searchBar.value;
    let locationStringURL = locationString.replace(/\s/g, "+");
    (async function (city) {
      currentWeatherPromise = await getWeather(city);
      if (currentWeatherPromise.cod === "404") {
        alert("Location Not Found");
      } else {
        displayData(processData(currentWeatherPromise));
      }
    })(locationStringURL);
  }
});
