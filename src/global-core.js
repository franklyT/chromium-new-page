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
	console.log((/\{\s*\[native code\]\s*\}/).test('' + fn));
}

// random number utility function
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Console clear utility function
function cClear(timeoutinms) {
  setTimeout(function() {
      console.clear();
      console.log('Tabby Tab: Console was cleaned by extension.')
  }, timeoutinms)
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
