// All images are royalty free via Pexels and other sources
const imageBay = {
  bg1:
    "url('https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg')",
  bg2:
    "url('https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg')",
  bg3:
    "url('https://images.pexels.com/photos/457447/pexels-photo-457447.jpeg')",
  bg4:
    "url('https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg')",
  bg5:
    "url('https://images.pexels.com/photos/877988/pexels-photo-877988.jpeg')",
  bg6:
    "url('https://images.pexels.com/photos/463732/pexels-photo-463732.jpeg')",
  bg7:
    "url('https://images.pexels.com/photos/1618676/pexels-photo-1618676.jpeg')",
  bg8:
    "url('https://images.pexels.com/photos/45876/beef-scotland-highland-beef-cow-45876.jpeg')",
  bg9:
    "url('https://images.pexels.com/photos/1332026/pexels-photo-1332026.jpeg')",
  bg10:
    "url('https://images.pexels.com/photos/1131856/pexels-photo-1131856.jpeg')"
};

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
  document.querySelector(".bg").style.backgroundImage =
    imageBay[`bg${Math.floor(Math.random() * 10) + 1}`];
}

callBackground();

function getBgUrl(el) {
  var bg = "";
  bg = el.style.backgroundImage;
  console.log(bg);
  return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

var image = document.createElement("img");
image.src = getBgUrl(document.querySelector(".bg"));
image.onload = function() {
  document.querySelector(".bg").style.display = "inline-flex";
};
