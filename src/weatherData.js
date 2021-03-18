async function getWeather(city) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID=c6c40d075e9c9b5b00b44d6f9af4de6e`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error;
  }
}

export { getWeather };
