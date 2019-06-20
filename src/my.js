// All images are royalty free via Pexels and other sources
const imageBay = {
  bg1: "sddsdsasdasda",
  bg2: "sdsddsdas",
  bg3: "ddsadsadasdsa",
  bg4: "dssdadasdas",
  bg5: "dsasaddasdas",
  bg6: "dssdadsadsadsa",
  bg7: "dsasdadasdasdsa",
  bg8: "dsdsaddasdsa",
  bg9: "dssaddasdsa",

  get myBg() {
    imageBay.bg = imageBay[`bg${Math.floor(Math.random() * 9) + 1}`];
  },

  get bgLength() {
    return Object.keys(imageBay).filter(elm => {
      return /[bg][0-9]/g.test(elm);
    });
  },

  bg: "",

  catchDeadLinks: []
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
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg;
  +"')";
}

callBackground();

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
  tester.addEventListener("load", imageFound);
  tester.addEventListener("error", imageNotFound);
  tester.src = url;
}

function imageFound() {
    document.querySelector(".bg").style.display = "inline-flex";
}

function imageNotFound() {
  imageBay.catchDeadLinks.push(imageBay.bg);
  if (imageBay.bgLength.length - 1 === imageBay.catchDeadLinks.length - 1) {
    console.log(
      `newTabPro: ERROR: Recovery failed. No valid background image can be found. Reverting to fallback.`
    );
    document.querySelector(".bg").style.backgroundImage =
      "url('../images/bgfallback.jpg')";
      document.querySelector(".bg").style.display = "inline-flex";
    return;
  }
  if ((imageBay.catchDeadLinks.length-1) === 0) {
    console.log(
      `newTabPro: ERROR: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
  }
  if ((imageBay.catchDeadLinks.length-1) === 1) {
    console.log(
      `newTabPro: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
    console.log("Suppressing further warnings from this chain.");
  }

  while (imageBay.catchDeadLinks.indexOf(imageBay.myBg) !== -1) {
    imageBay.myBg;
  }
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg;
  +"')";
  catchFourZeroFour(imageBay.bg);
}

catchFourZeroFour(imageBay.bg);
