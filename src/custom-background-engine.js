function myBg() {
  return imageBay[`bg${Math.floor(Math.random() * bgLength().length) + 1}`];
}

function bgLength() {
  return Object.keys(imageBay).filter(elm => {
    return /[bg][0-9]/g.test(elm);
  });
}
function callBackground() {
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg;
  +"')";
}

function getBgUrl(el) {
  var bg = "";
  bg = el.style.backgroundImage;
  return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}
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
  if (bgLength().length - 1 === imageBay.catchDeadLinks.length - 1) {
    console.log(
      `Tabby Tab: ERROR: Recovery failed. No valid background image can be found. Reverting to fallback.`
    );
    document.querySelector(".bg").style.backgroundImage =
      "url('../images/bgfallback.jpg')";
    document.querySelector(".bg").style.display = "inline-flex";
    return;
  }
  if (imageBay.catchDeadLinks.length - 1 === 0) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
  }
  if (imageBay.catchDeadLinks.length - 1 === 1) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
    console.log(
      "Tabby Tab: NOTIFICATION: Suppressing further warnings from this chain."
    );
  }

  while (imageBay.catchDeadLinks.indexOf(myBg) !== -1) {
    myBg;
  }
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg;
  +"')";
  catchFourZeroFour(imageBay.bg);
}

chrome.storage.sync.get("allData", function(items) {
  imageBay = items.allData;

  var image = document.createElement("img");
  image.src = getBgUrl(document.querySelector(".bg"));
  image.onload = function() {
    document.querySelector(".bg").style.display = "inline-flex";
  };

  imageBay.bg = myBg();

  callBackground();
  catchFourZeroFour(imageBay.bg);
});
