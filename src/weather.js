var YOUR_API_KEY_HERE = obfuscate([284361,8786750,15031356,2899696,3852145,187]);

function obfuscate(arr){
    var k = "0";
    for (var i=0;i<arr.length;i++){
        var s = arr[i].toString(16);
        k += s;
    }
    return k;
}

//NOTE: ES5 chosen instead of ES6 for compatibility with older mobile devices
var now, dd, td;
var lat, lon, gd;
var weatherurl, wd, icon;
var city, region;
var temperaturescale = "F"; //set to F or C (fahrenheit or celsius)
var usephp = false; // set to true to use a php document to hide your api key
var locationRequested = false;
var weatherdata, weatherminute;
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var sunsettime = 0;
var sunrisetime = 0;
var iconurl = "https://openweathermap.org/img/w/";

document.addEventListener("DOMContentLoaded", init, false);
function init(){
  dd = document.getElementById("date");
  td = document.getElementById("time");
  wd = document.getElementById("weather");
  gd = document.getElementById("gps");
  icon = document.getElementById("icon");
  weatherminute = randRange(0,14);
  getLocation();
  updateTime();
  setInterval(updateTime,1000);
}
function updateTime(){
  var clockdata = getClockStrings();
  // dd.innerHTML = clockdata.datehtml;
  td.innerHTML = clockdata.timehtml;
  dd.dateTime = now.toISOString();
  td.dateTime = now.toISOString();
  var sec = now.getSeconds();
  var minutes = now.getMinutes();
  if (locationRequested && sec === 0){
    checkForSunset(); //checks for sunset once each minute
     if (minutes % 15 === weatherminute){
      getWeather(); //get weather every 15 minutes
      //weatherminute is a random number between
      //0 and 14 to ensure that users don't all hit
      //the API at the same minute
    }
  }
}
function getClockStrings(){
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
  if (hour === 0) {clockhour = 12;}
  var clockminutes = minutes < 10 ? "0" + minutes : minutes;
  var clockseconds = seconds < 10 ? "0" + seconds : seconds;
  var datehtml = day + ", " + month + " " + date + ", " + year;
  var timehtml = clockhour + ":" + clockminutes + "<span>:" + clockseconds + " " + meridian + "</span>" + "</span>";
  return {"datehtml":datehtml,"timehtml":timehtml};
}
function getLocation() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      var noerror = true;//for testing
      if (this.status === 200 && noerror){
        var data = xhttp.responseText;
        showPosition(JSON.parse(data));
      }else{
        showPosition(null);
      }
    }
  };
  xhttp.open("GET", "https://extreme-ip-lookup.com/json/", true);
  xhttp.send();
}

function showPosition(position) {
  if (!position){
    return;
  }
  lat = Number(position.lat);
  lon = Number(position.lon);
  city = position.city;
  region = position.region;
  //gd.innerHTML = "GPS: " + lat.toFixed(2) + " | " + lon.toFixed(2);
  // gd.innerHTML = city + ", " + region;
  if (usephp){
    weatherurl = "clock.php?lat=" + lat + "&lon=" + lon;
    //weatherurl = "clock.php?lat=200&lon=200"; // for testing error response
  }else{    
    weatherurl = "https://api.openweathermap.org/data/2.5/weather?";
    weatherurl += "lat=" + lat + "&lon=" + lon + "&APPID=";
    weatherurl += YOUR_API_KEY_HERE;
    //for the APPID, please substitute your own API Key you can get for free from openweathermap.org
  }
  /*
        an alternative to exposing your API Key is to call a php script that
        calls the weatherurl and returns a json string as part of a document that
        can be parsed. Codepen doesn't allow php access so I established a throw-away
        account on openweathermap.org for this demonstration which has the apikey referenced here.

        for a working example that uses php to hide the api key see https://shearspiremedia.com/demos/clock/

        HERE IS A BASIC PHP SCRIPT THAT YOU COULD PLACE IN YOUR OWN clock.php file on your server
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>clock data</title></head>
        <body>
        <?php
        error_reporting(0);
        $latitude = "80";
        $longitude = "-85";
        if (isset($_GET["lat"]) && isset($_GET["lon"])) {
              $latitude = $_GET["lat"];
              $longitude = $_GET["lon"];
        }
        $endpoint = "http://api.openweathermap.org/data/2.5/weather?";
        $apikey = "YOUR_API_KEY_HERE";
        $weatherurl = $endpoint . "lat=" . $latitude . "&lon=" . $longitude . "&appid=" . $apikey;
        $jsonfile = file_get_contents($weatherurl);
        if ($jsonfile !== false){
            echo "$jsonfile";
        }else{
            echo '{"weather":[{"description":"Weather Unavailable","icon":"01n"}],"main":{"temp":255.372278}}';
        }
        ?>
        </body>
        </html>
        */
  if (!locationRequested){
    getWeather();
    locationRequested = true;
  }
}
function getWeather(){
  wd.innerHTML = " ... ";
  // I opted to use the older XMLHttpRequest because fetch is not supported on old devices like the iPhone 4s
  // I developed this page so I could use my old iPhone 4s as a wall clock.
  var xhttp = new XMLHttpRequest();
  xhttp.responseType = usephp ? "document" : "text"; //the php file returns a document rather than plain text
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      //when using php as a data source we need the textContent of the body of the returned document
      var data = usephp ? xhttp.response.body.textContent : xhttp.responseText;
      processWeather(JSON.parse(data));
    }
  };
  xhttp.open("GET", weatherurl, true);
  xhttp.send();
}
function convertTemperature(kelvin){
  //converts temps in kelvin to celsius or fahrenheit
  var celsius = (kelvin - 273.15);
  return temperaturescale === "F" ? celsius * 1.8 + 32 : celsius;
}
function processWeather(data){
  weatherdata = data;
  
  var weather = weatherdata["weather"][0];
  icon.className = "i" + weather.icon;
  icon.style.opacity = 1;
  var localtemperature = convertTemperature(data["main"].temp).toFixed(0);
  wd.innerHTML =  localtemperature + "°";
  sunsettime = Number(data["sys"].sunset);
  sunrisetime = Number(data["sys"].sunrise);
  checkForSunset();
}

//random number utility function
function randRange(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}