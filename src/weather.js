// https://css-tricks.com/how-i-built-a-gps-powered-weather-clock-with-my-old-iphone-4/

const weatherParser = {
  get weatherurl() {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${weatherParser.lat}&lon=${weatherParser.lon}&APPID=${weatherParser.APIKey}`;
  },
  get weatherminute() {
    return randRange(0, 14);
  },
  get now() {
    return new Date();
  },

  APIKey: '90593d5093dd6b724ed5aec9eeb5c930',
  temperaturescale: 'F',

  td: document.getElementById('time'),
  wd: document.getElementById('weather'),
  icon: document.getElementById('icon'),

  lat: 0,
  lon: 0,
  weatherdata: '',
  locationRequested: false,
};

onDOMLoad(init());

function init() {
  getLocation();
  updateTime();
  setInterval(updateTime, 1000);
}
function updateTime() {
  const clockdata = getClockStrings();
  weatherParser.td.innerHTML = clockdata.timehtml;
  weatherParser.td.dateTime = weatherParser.now.toISOString();
  const sec = weatherParser.now.getSeconds();
  const minutes = weatherParser.now.getMinutes();
  if (weatherParser.locationRequested && sec === 0) {
    if (minutes % 15 === weatherParser.weatherminute) {
      getWeather();
    }
  }
}
function getClockStrings() {
  const year = weatherParser.now.getFullYear();
  const month = months[weatherParser.now.getMonth()];
  const date = weatherParser.now.getDate();
  const day = days[weatherParser.now.getDay()];
  const hour = weatherParser.now.getHours();
  const minutes = weatherParser.now.getMinutes();
  const seconds = weatherParser.now.getSeconds();
  const meridian = hour < 12 ? ' AM' : ' PM';
  let clockhour = hour > 12 ? hour - 12 : hour;
  if (hour === 0) {
    clockhour = 12;
  }
  const clockminutes = minutes < 10 ? `0${minutes}` : minutes;
  const clockseconds = seconds < 10 ? `0${seconds}` : seconds;
  const datehtml = `${day}, ${month} ${date}, ${year}`;
  const timehtml = `${clockhour}:${clockminutes}<div class='seconds'>:${clockseconds}</div>`
    + `<div class='meridian'>${meridian}</div>`
    + '</span>';
  return { datehtml, timehtml };
}
function getLocation() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        const data = xhttp.responseText;
        showPosition(JSON.parse(data));
      } else {
        showPosition(null);
      }
    }
  };

  xhttp.open('GET', 'https://extreme-ip-lookup.com/json/', true);
  xhttp.send();
}

function showPosition(position) {
  if (!position) {
    return;
  }
  weatherParser.lat = position.lat;
  weatherParser.lon = position.lon;
  if (!weatherParser.locationRequested) {
    getWeather();
    weatherParser.locationRequested = true;
  }
}
function getWeather() {
  weatherParser.wd.innerHTML = ' ... ';
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = 'text';
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const data = xhttp.responseText;
      processWeather(JSON.parse(data));
    }
  };

  xhttp.open('GET', weatherParser.weatherurl, true);
  xhttp.send();
}
function convertTemperature(kelvin) {
  // converts temps in kelvin to celsius or fahrenheit
  const celsius = kelvin - 273.15;
  return weatherParser.temperaturescale === 'F' ? celsius * 1.8 + 32 : celsius;
}
function processWeather(data) {
  weatherParser.weatherdata = data;
  const weather = weatherParser.weatherdata.weather[0];
  weatherParser.icon.className = `i${weather.icon}`;
  weatherParser.icon.style.opacity = 1;
  const localtemperature = convertTemperature(data.main.temp).toFixed(0);
  weatherParser.wd.innerHTML = `${localtemperature}°`;
}

// To be addressed
// icon.setAttribute('data-title', capitalizeMe(weatherdata.weather[0].description));
// icon.getAttribute('data-title');
