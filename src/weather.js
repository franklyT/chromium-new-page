// Abuse it and it breaks :(
const YOUR_API_KEY_HERE = '90593d5093dd6b724ed5aec9eeb5c930';
const temperaturescale = 'F'; // set to F or C (fahrenheit or celsius)
const iconurl = 'https://openweathermap.org/img/w/';

let now;
let dd;
let td;
let lat;
let lon;
let gd;
let weatherurl;
let wd;
let icon;
let city;
let region;
let weatherdata;
let weatherminute;
let locationRequested = false;

onDOMLoad(init());

function init() {
  td = document.getElementById('time');
  wd = document.getElementById('weather');
  gd = document.getElementById('gps');
  icon = document.getElementById('icon');

  weatherminute = randRange(0, 14);
  getLocation();
  updateTime();
  setInterval(updateTime, 1000);
}
function updateTime() {
  const clockdata = getClockStrings();
  td.innerHTML = clockdata.timehtml;
  td.dateTime = now.toISOString();
  const sec = now.getSeconds();
  const minutes = now.getMinutes();
  if (locationRequested && sec === 0) {
    if (minutes % 15 === weatherminute) {
      getWeather(); // get weather every 15 minutes
      // weatherminute is a random number between
      // 0 and 14 to ensure that users don't all hit
      // the API at the same minute
    }
  }
}
function getClockStrings() {
  now = new Date();
  const year = now.getFullYear();
  const month = months[now.getMonth()];
  const date = now.getDate();
  const day = days[now.getDay()];
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
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
    if (this.readyState === 4) {
      if (this.status === 200) {
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
  lat = Number(position.lat);
  lon = Number(position.lon);
  city = position.city;
  region = position.region;
  weatherurl = 'https://api.openweathermap.org/data/2.5/weather?';
  weatherurl += `lat=${lat}&lon=${lon}&APPID=`;
  weatherurl += YOUR_API_KEY_HERE;

  if (!locationRequested) {
    getWeather();
    locationRequested = true;
  }
}
function getWeather() {
  wd.innerHTML = ' ... ';
  const xhttp = new XMLHttpRequest();
  xhttp.responseType = 'text';
  xhttp.onreadystatechange = () => {
    if (this.readyState === 4 && this.status === 200) {
      const data = xhttp.responseText;
      processWeather(JSON.parse(data));
    }
  };
  xhttp.open('GET', weatherurl, true);
  xhttp.send();
}
function convertTemperature(kelvin) {
  // converts temps in kelvin to celsius or fahrenheit
  const celsius = kelvin - 273.15;
  return temperaturescale === 'F' ? celsius * 1.8 + 32 : celsius;
}
function processWeather(data) {
  weatherdata = data;
  const weather = weatherdata.weather[0];
  icon.className = `i${weather.icon}`;
  icon.style.opacity = 1;
  const localtemperature = convertTemperature(data.main.temp).toFixed(0);
  wd.innerHTML = `${localtemperature}°`;
}

// To be addressed
// icon.setAttribute('data-title', capitalizeMe(weatherdata.weather[0].description));
// icon.getAttribute('data-title');
