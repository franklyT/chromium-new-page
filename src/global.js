/* eslint-disable no-unused-vars */
/*
Disclaimer: In addition to project licensing, it should be noted that images used are royalty-free
via several sources: Pexels, Unsplash, premium licensing from icon providers, custom work, etc.
Other attribution is noted where applicable.
*/
/* Global vars */

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// querySelector helper rewrites
function select(sel) {
  return typeof sel === 'string' ? document.querySelector(sel) : sel;
}

function selectAll(sel) {
  return typeof sel === 'string' ? document.querySelectorAll(sel) : sel;
}

// load to the DOM with a performance metric
async function callWithPerf(fn) {
  const start = new Date().getTime();
  await fn();
  console.log(`${fn.name} took ${new Date().getTime() - start} ms to execute.`);
}

// DOM load wrapper
function onDOMLoad(method) {
  return window.addEventListener(
    'DOMContentLoaded',
    () => {
      // eslint-disable-next-line no-unused-expressions
      method;
    },
    false,
  );
}
// random number utility function
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console clear utility function, should largely not be used
function cClear(timeoutinms) {
  setTimeout(() => {
    console.clear();
    console.log('Tabby Tab: Warning: Console was cleaned by extension.');
  }, timeoutinms);
}

// Capitalization utility function
function capitalizeMe(text) {
  const capitalText = text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  return capitalText;
}

function timeConverter(time) {
  const timeR = time.split(':'); // convert to array

  // fetch
  const hours = Number(timeR[0]);
  const minutes = Number(timeR[1]);

  // calculate
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = `${hours}`;
  } else if (hours > 12) {
    timeValue = `${hours - 12}`;
  } else if (hours === 0) {
    timeValue = '12';
  }

  timeValue += minutes < 10 ? `:0${minutes}` : `:${minutes}`; // get minutes
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM

  return timeValue;
}

function dateConverter(date) {
  // get day algorithm based on https://www.mindstick.com/blog/387/calculating-day-of-the-week-for-any-date-in-javascript

  const year = date.slice(0, 4);
  const day = date.slice(8, 10);
  const month = date.slice(5, 7);
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const d = (day
      + y
      + Math.floor(y / 4)
      - Math.floor(y / 100)
      + Math.floor(year / 400)
      + Math.floor((31 * m) / 12))
    % 7;

  return `${days[d]}, ${months[Number(date.slice(5, 7)) - 1]} ${Number(date.slice(8, 10))}`;
}

// Helper function to get selected text
function getSelectedText() {
  let text = '';
  if (typeof window.getSelection !== 'undefined') {
    text = window.getSelection().toString();
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    text = document.selection.createRange().text;
  }
  return text;
}

// Helper function to test whether or not an element is outside of the viewport bounds
function isInViewport(elm) {
  const bounding = elm.getBoundingClientRect();
  return (
    bounding.top >= 0
    && bounding.left >= 0
    && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Helper function for time of day
function getDayState() {
  const dayTime = new Date().getHours();
  if (dayTime < 12) {
    return 'Morning';
  }
  if (dayTime >= 12 && dayTime < 17) {
    return 'Afternoon';
  }
  if (dayTime >= 17) {
    return 'Night';
  }
  return null;
}

// init UI
// document.querySelector('#masterContainer').style.display = "";
// function gSearch() {
//  window.location.href = `http://www.google.com/search?q=${
//    select(".search").value
//  }`;
// }

// select(".submit").addEventListener("click", function() {
// gSearch();
// });

// select(".search").addEventListener("keydown", event => {
// if (event.isComposing || event.keyCode === 13) {
//  gSearch();
// }
// });

/* function ready() {
  select(".search").focus();
};
*/
