/* Disclaimer: In addition to project licensing, it should be noted that images used are royalty-free
   via several sources: Pexels, Unsplash, premium licensing from icon providers, custom work, etc.
   Other attribution is noted where applicable.
*/

// querySelector helper rewrites
function select(sel) {
  return typeof sel == "string" ? document.querySelector(sel) : sel;
}

function selectAll(sel) {
  return typeof sel == "string" ? document.querySelectorAll(sel) : sel;
}

// Safety check utility function
function isNative(fn) {
  console.log(/\{\s*\[native code\]\s*\}/.test("" + fn));
}

// DOM load wrapper
function onDOMLoad(method) {
return window.addEventListener("DOMContentLoaded", function() {
method;
}, false);
}
// random number utility function
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Console clear utility function
function cClear(timeoutinms) {
  setTimeout(function() {
    console.clear();
    console.log("Tabby Tab: Console was cleaned by extension.");
  }, timeoutinms);
}

// Capitalization utility function
function capitalizeMe(text) {
  const capitalText = text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
  return capitalText;
}

function timeConverter(time) {
 // console.log(time)
time = time.split(':'); // convert to array

// fetch
var hours = Number(time[0]);
var minutes = Number(time[1]);

// calculate
var timeValue;

if (hours > 0 && hours <= 12) {
  timeValue= "" + hours;
} else if (hours > 12) {
  timeValue= "" + (hours - 12);
} else if (hours == 0) {
  timeValue= "12";
}
 
timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

return timeValue;
}

function dateConverter(date) {
  // get day algorithm based on https://www.mindstick.com/blog/387/calculating-day-of-the-week-for-any-date-in-javascript

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',       
  'Thursday', 'Friday', 'Saturday'];
  const year = date.slice(0,4)
  const day = date.slice(8, 10)
  const month = date.slice(5,7)
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const d = (day + y + Math.floor(y / 4) - Math.floor(y / 100) +
  Math.floor(year / 400) + Math.floor((31 * m) / 12)) % 7;

  const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

  return `${days[d]}, ${months[Number(date.slice(5,7))-1]} ${Number(date.slice(8,10))}`;

// return `${date}`;
}


// init UI
//document.querySelector('#masterContainer').style.display = "";
//function gSearch() {
//  window.location.href = `http://www.google.com/search?q=${
//    select(".search").value
//  }`;
//}

// select(".submit").addEventListener("click", function() {
// gSearch();
//});

//select(".search").addEventListener("keydown", event => {
// if (event.isComposing || event.keyCode === 13) {
//  gSearch();
// }
//});

/* function ready() {
  select(".search").focus();
};
*/
