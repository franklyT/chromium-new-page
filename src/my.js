// All images are royalty free via Pexels and other sources
const imageBay = {
  bg1:
    "https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg",
  bg2:
    "https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg",
  bg3:
    "https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg",
  bg4:
    "https://images.pexels.com/photos/877988/pexels-photo-877988.jpeg",
  bg5:
    "https://images.pexels.com/photos/463732/pexels-photo-463732.jpeg",
  bg6:
    "https://images.pexels.com/photos/1618676/pexels-photo-1618676.jpeg",
  bg7:
    "https://images.pexels.com/photos/45876/beef-scotland-highland-beef-cow-45876.jpeg",
  bg8:
    "https://images.pexels.com/photos/1332026/pexels-photo-1332026.jpeg",
  bg9:
    "https://images.pexels.com/photos/1131856/pexels-photo-1131856.jpeg",

  get myBg() {imageBay.bg = imageBay[`bg${Math.floor(Math.random() * 9) + 1}`]},

  bg: ""
};

imageBay.myBg;

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

/* function ready() {
  document.querySelector(".search").focus();
};
*/

function callBackground() {
  // document.querySelector('.bg').style.backgroundImage = `url('https://traina.me/images/bg${Math.floor(Math.random()*37)+1}.jpg')`;
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg; + "')"
}

callBackground();
document.querySelector(".bg").style.display = "inline-flex";


function getBgUrl(el) {
  var bg = "";
  bg = el.style.backgroundImage;
  return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

var image = document.createElement("img");
image.src = getBgUrl(document.querySelector(".bg"));
image.onload = function() {
  document.querySelector(".bg").style.display = "inline-flex";
};

function catchFourZeroFour(url) {
    let tester = new Image();
    tester.addEventListener('load', imageFound);
    tester.addEventListener('error', imageNotFound);
    tester.src = url;
}

function imageFound() {
}

function imageNotFound() {
    console.log(`Error: The background image requested at ${imageBay.bg} is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`);
    imageBay.myBg;
    document.querySelector(".bg").style.backgroundImage =  "url('" + imageBay.bg; + "')";
    catchFourZeroFour(imageBay.bg)
}

catchFourZeroFour(imageBay.bg);