document.addEventListener("DOMContentLoaded", init, false);
function init() {
  td = document.getElementById("time");
  wd = document.getElementById("weather");
  gd = document.getElementById("gps");
  icon = document.getElementById("icon");
  weatherminute = randRange(0, 14);
  getLocation();
  updateTime();
  setInterval(updateTime, 1000);
}
function updateTime() {
  var clockdata = getClockStrings();
  td.innerHTML = clockdata.timehtml;
  td.dateTime = now.toISOString();
  var sec = now.getSeconds();
  var minutes = now.getMinutes();
  if (locationRequested && sec === 0) {
    if (minutes % 15 === weatherminute) {
      getWeather(); //get weather every 15 minutes
      //weatherminute is a random number between
      //0 and 14 to ensure that users don't all hit
      //the API at the same minute
    }
  }
}
function getClockStrings() {
  now = new Date();
  var year = now.getFullYear();
  var month = months[now.getMonth()];
  var date = now.getDate();
  var day = days[now.getDay()];
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var meridian = hour < 12 ? " AM" : " PM";
  var clockhour = hour > 12 ? hour - 12 : hour;
  if (hour === 0) {
    clockhour = 12;
  }
  var clockminutes = minutes < 10 ? "0" + minutes : minutes;
  var clockseconds = seconds < 10 ? "0" + seconds : seconds;
  var datehtml = day + ", " + month + " " + date + ", " + year;
  var timehtml =
    clockhour +
    ":" +
    clockminutes +
    "<div class='seconds'>:" +
    clockseconds +
    "</div>" +
    "<div class='meridian'>" +
    meridian +
    "</div>" +
    "</span>";
  return { datehtml: datehtml, timehtml: timehtml };
}
function getLocation() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var data = xhttp.responseText;
        showPosition(JSON.parse(data));
      } else {
        showPosition(null);
      }
    }
  };
  xhttp.open("GET", "https://extreme-ip-lookup.com/json/", true);
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
    weatherurl = "https://api.openweathermap.org/data/2.5/weather?";
    weatherurl += "lat=" + lat + "&lon=" + lon + "&APPID=";
    weatherurl += YOUR_API_KEY_HERE;
    //for the APPID, please substitute your own API Key you can get for free from openweathermap.org

  if (!locationRequested) {
    getWeather();
    locationRequested = true;
  }
}
function getWeather() {
  wd.innerHTML = " ... ";
  // I opted to use the older XMLHttpRequest because fetch is not supported on old devices like the iPhone 4s
  // I developed this page so I could use my old iPhone 4s as a wall clock.
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = "text";
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var data = xhttp.responseText;
      processWeather(JSON.parse(data));
    }
  };
  xhttp.open("GET", weatherurl, true);
  xhttp.send();
}
function convertTemperature(kelvin) {
  //converts temps in kelvin to celsius or fahrenheit
  var celsius = kelvin - 273.15;
  return temperaturescale === "F" ? celsius * 1.8 + 32 : celsius;
}
function processWeather(data) {
  weatherdata = data;

  var weather = weatherdata["weather"][0];
  icon.className = "i" + weather.icon;
  icon.style.opacity = 1;
  icon.title = capitalizeMe(weatherdata.weather[0].description);
  var localtemperature = convertTemperature(data["main"].temp).toFixed(0);
  wd.innerHTML = localtemperature + "°";
}