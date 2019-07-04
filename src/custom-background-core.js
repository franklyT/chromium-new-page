/* eslint-disable no-undef */
onDOMLoad(getBg());

function myBg() {
  return imageBay[`bg${Math.floor(Math.random() * bgLength().length) + 1}`];
}

function bgLength() {
  return Object.keys(imageBay).filter(elm => {
    return /[bg][0-9]/g.test(elm);
  });
}

function callBackground() {
  select('.background__image').style.backgroundImage = "url('" + imageBay.bg;
  +"')";
}

function getBgUrl(elm) {
  let bg = elm.style.backgroundImage;
  return bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
}

function catchFourZeroFour(url) {
  let tester = new Image();
  tester.addEventListener('load', imageFound);
  tester.addEventListener('error', imageNotFound);
  tester.src = url;
}

function imageFound() {
  select('.background__image').style.display = 'inline-flex';
}

function imageNotFound() {
  imageBay.catchDeadLinks.push(imageBay.bg);
  if (bgLength().length - 1 === imageBay.catchDeadLinks.length - 1) {
    console.log(
      `Tabby Tab: ERROR: Recovery failed. No valid background image can be found. Reverting to fallback.`,
    );
    select('.background__image').style.backgroundImage = "url('../images/bgfallback.jpg')";
    select('.background__image').style.display = 'inline-flex';
    return;
  }
  if (imageBay.catchDeadLinks.length - 1 === 0) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image.`,
    );
  }
  if (imageBay.catchDeadLinks.length - 1 === 1) {
    console.log(
      `Tabby Tab: WARNING: The background image requested at ${
        imageBay.catchDeadLinks[imageBay.catchDeadLinks.length - 1]
      } is no longer available. The program is attempting automatic recovery with another image.`,
    );
    console.log('Tabby Tab: NOTIFICATION: Suppressing further warnings from this chain.');
  }

  while (imageBay.catchDeadLinks.indexOf(myBg) !== -1) {
    myBg;
  }
  select('.background__image').style.backgroundImage = "url('" + imageBay.bg;
  +"')";
  catchFourZeroFour(imageBay.bg);
}

function getBg() {
  chrome.storage.sync.get('allData', function(items) {
    // Sets a default BG status
    if (items.allData === null || items.allData === undefined || !items.allData) {
      chrome.storage.sync.set({ allData: vanillaBg, bgID: 'vanilla' }, function() {
        imageBay = vanillaBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    } else {
      imageBay = items.allData;
      const image = document.createElement('img');
      image.src = getBgUrl(select('.background__image'));
      image.onload = function() {
        select('.background__image').style.display = 'inline-flex';
      };

      imageBay.bg = myBg();

      callBackground();
      catchFourZeroFour(imageBay.bg);
    }
  });
}
