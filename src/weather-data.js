// Abuse it and it breaks, that simple. I'm not inclined to obfuscate. Get your own if it's been broken.
var YOUR_API_KEY_HERE = "90593d5093dd6b724ed5aec9eeb5c930";
//NOTE: ES5 chosen instead of ES6 for compatibility with older mobile devices
var now, dd, td;
var lat, lon, gd;
var weatherurl, wd, icon;
var city, region;
var temperaturescale = "F"; //set to F or C (fahrenheit or celsius)
var locationRequested = false;
var weatherdata, weatherminute;
var iconurl = "https://openweathermap.org/img/w/";