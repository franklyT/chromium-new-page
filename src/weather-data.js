// Abuse it and it breaks :(
const YOUR_API_KEY_HERE = "90593d5093dd6b724ed5aec9eeb5c930";
const temperaturescale = "F"; //set to F or C (fahrenheit or celsius)
const iconurl = "https://openweathermap.org/img/w/";

let now, dd, td;
let lat, lon, gd;
let weatherurl, wd, icon;
let city, region;
let weatherdata, weatherminute;
let locationRequested = false;