function initializeOnload() {
  const search = document.querySelector(".btn");
  let cityName = document.querySelector(".city-name");
  let icon = document.querySelector(".time-zone p");
  let temp = document.querySelector(".temp");
  let unit = document.querySelector(".unit");
  const degree = document.querySelector(".deg");
  let description = document.querySelector(".description");
  let minMax = document.querySelector(".min-max");
  let long;
  let lat;
  const APIID = "439caccd86dab5ec272c603bb3c3122e";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // fetch data based on geo location
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIID}`;
      getData(url, cityName, temp, unit, degree, description, minMax);
    });

    // get data and display
    search.addEventListener("click", (e) => {
      e.preventDefault();
      let cityName = document.querySelector("#by-city .city-name");
      let temp = document.querySelector("#by-city .temp");
      let unit = document.querySelector("#by-city .unit");
      const degree = document.querySelector("#by-city .deg");
      let description = document.querySelector("#by-city .description");
      let minMax = document.querySelector("#by-city .min-max");
      const searchBox = document.querySelector(".search");
      cityName.innerHTML = "Loading...";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=${APIID}`;
      searchBox.value = "";
      getData(url, cityName, temp, unit, degree, description, minMax);
    });
  }
}

function getData(url, cityName, temp, unit, degree, description, minMax) {
  let long;
  let lat;
  let weather = [];
  let celsius, kelvinMain;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // store data in local storage
      weather.unshift(data);
      localStorage.setItem("weatherData", JSON.stringify(weather));

      // load data from local storage

      let localWeather = JSON.parse(localStorage.getItem("weatherData")) || [];

      cityName.innerHTML = localWeather[0].name;

      kelvinMain = localWeather[0].main.temp;

      //Formula used to convert from kelvin to celsius kelvin - 273.15
      celsius = convertToCelsius(kelvinMain);
      // Formula used to convert from celsius to fahrenheit (celsius * 9/5) + 32
      let min = convertToCelsius(localWeather[0].main.temp_min);
      let max = convertToCelsius(localWeather[0].main.temp_max);
      let minMaxTemp = `Min: ${displayString(
        min
      )} C <br/><br/> Max: ${displayString(max)} C`;
      temp.innerHTML = `${displayString(celsius)} C`;
      unit.innerHTML = "C";
      minMax.innerHTML = minMaxTemp;
      temp.addEventListener("click", () => {
        celsiusOrFahrenheit(
          unit,
          temp,
          minMax,
          localWeather[0].main.temp_min,
          localWeather[0].main.temp_max,
          localWeather[0].main.temp
        );
      });
      description.innerHTML = localWeather[0].weather[0].description;
    });
}

function celsiusOrFahrenheit(unit, temp, minMax, min, max, main) {
  let minTemp, maxTemp, mainTemp;
  if (unit.innerHTML === "F") {
    minTemp = convertToCelsius(min);
    maxTemp = convertToCelsius(max);
    mainTemp = convertToCelsius(main);
    unit.innerHTML = "C";
    temp.innerHTML = `${displayString(mainTemp)} C`;
    minMax.innerHTML = `Min: ${displayString(
      minTemp
    )}C  <br/><br/> Max:  ${displayString(maxTemp)}C`;
  } else {
    minTemp = convertToFahrenheit(convertToCelsius(min));
    maxTemp = convertToFahrenheit(convertToCelsius(max));
    mainTemp = convertToFahrenheit(convertToCelsius(main));
    temp.innerHTML = `${displayString(mainTemp)} F`;
    minMax.innerHTML = `Min: ${displayString(
      minTemp
    )}F <br/><br/> Max:   ${displayString(maxTemp)}F`;
    unit.innerHTML = "F";
  }
}

function convertToCelsius(tempKelvin) {
  return (tempKelvin - 273.15).toFixed(2);
}
function convertToFahrenheit(celsius) {
  return (celsius * (9 / 5) + 32).toFixed(2);
}

function displayString(val) {
  return `${val} ${String.fromCharCode(176)}`;
}
