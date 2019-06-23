// init UI
//document.querySelector('#masterContainer').style.display = "";
function gSearch() {
  window.location.href = `http://www.google.com/search?q=${
    document.querySelector(".search").value
  }`;
}

document.querySelector(".submit").addEventListener("click", function() {
  gSearch();
});

document.querySelector(".search").addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 13) {
    gSearch();
  }
});

//random number utility function
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* function ready() {
  document.querySelector(".search").focus();
};
*/
