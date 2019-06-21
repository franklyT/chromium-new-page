// All images are royalty free via Pexels and other sources
const imageBay = {
  bg1: "https://images.pexels.com/photos/422202/pexels-photo-422202.jpeg",
  bg2: "https://images.pexels.com/photos/66400/pexels-photo-66400.jpeg",
  bg3: "https://images.pexels.com/photos/1276237/pexels-photo-1276237.jpeg",
  bg4: "https://images.pexels.com/photos/511161/pexels-photo-511161.jpeg",
  bg5: "https://images.pexels.com/photos/64231/cows-cow-austria-pasture-sky-64231.jpeg",
  bg6: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg",
  bg7: "https://images.pexels.com/photos/735974/pexels-photo-735974.jpeg",
  bg8: "https://images.pexels.com/photos/325257/pexels-photo-325257.jpeg",
  bg9: "https://images.pexels.com/photos/162240/bull-calf-heifer-ko-162240.jpeg",
  bg10: "https://images.pexels.com/photos/394887/pexels-photo-394887.jpeg",

  bg11: "https://images.pexels.com/photos/422207/pexels-photo-422207.jpeg",

  bg12: "https://images.pexels.com/photos/51950/calf-cow-feast-pasture-51950.jpeg",

  bg13: "https://images.pexels.com/photos/119587/pexels-photo-119587.jpeg",

  bg14: "https://images.pexels.com/photos/877983/pexels-photo-877983.jpeg",
  bg15: "https://images.pexels.com/photos/144234/bull-landscape-nature-mammal-144234.jpeg",
  bg16: "https://images.pexels.com/photos/457447/pexels-photo-457447.jpeg",

  bg17: "https://images.pexels.com/photos/552766/pexels-photo-552766.jpeg",

  bg18: "https://images.pexels.com/photos/420233/pexels-photo-420233.jpeg",

  bg19: "https://images.pexels.com/photos/542258/pexels-photo-542258.jpeg",

  bg20: "https://images.pexels.com/photos/1131856/pexels-photo-1131856.jpeg",

  bg21: "https://images.pexels.com/photos/735976/pexels-photo-735976.jpeg",

  get myBg() {
    imageBay.bg = imageBay[`bg${Math.floor(Math.random() * (imageBay.bgLength.length)) + 1}`];
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
      `Tabby Tab: ERROR: Recovery failed. No valid background image can be found. Reverting to fallback.`
    );
    document.querySelector(".bg").style.backgroundImage =
      "url('../images/bgfallback.jpg')";
      document.querySelector(".bg").style.display = "inline-flex";
    return;
  }
  if ((imageBay.catchDeadLinks.length-1) === 0) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
  }
  if ((imageBay.catchDeadLinks.length-1) === 1) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image, but this should be noted to the developer.`
    );
    console.log("Tabby Tab: NOTIFICATION: Suppressing further warnings from this chain.");
  }

  while (imageBay.catchDeadLinks.indexOf(imageBay.myBg) !== -1) {
    imageBay.myBg;
  }
  document.querySelector(".bg").style.backgroundImage = "url('" + imageBay.bg;
  +"')";
  catchFourZeroFour(imageBay.bg);
}

catchFourZeroFour(imageBay.bg);


        /**
         * Remove existing favicon(s) and create a new one
         * @param new_icon
         * @returns {boolean}
         */
        processIcon = function (new_icon) {
            var el, icon, link;
            
            el = document.querySelectorAll('head link[rel*="icon"]');
            
            // Remove existing favicons
            Array.prototype.forEach.call(el, function (node) {
                node.parentNode.removeChild(node);
            });
            
            // Set preconfigured or custom (http|https|data) icon
            icon = (/^(https?|data):/.test(new_icon) === true) ? new_icon : chrome.extension.getURL(new_icon);
            
            // Create new favicon
            link      = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel  = 'icon';
            link.href = icon;
            
            document.getElementsByTagName('head')[0].appendChild(link);
            
            return true;
        };

        processIcon('favicon128.png');