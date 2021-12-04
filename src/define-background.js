const cowBg = {
  bg: '',
  catchDeadLinks: [],
};


for (let i = 1; i < 54; i += 1) {
  // cowBg[`bg${i}`] = `https://traina.me/images/cowBg/bg${i}.jpg`;
  cowBg[`bg${i}`] = `fdfdfdfdsfs`;
}

const vanillaBg = {
  bg: '',
  catchDeadLinks: [],
};

for (let i = 1; i < 45; i += 1) {
  // vanillaBg[`bg${i}`] = `https://traina.me/images/vanillaBg/bg${i}.jpg`;
  vanillaBg[`bg${i}`] = `fdfds  `;
}

// eslint-disable-next-line no-unused-vars
const tabbyBg = {
  bg: '',
  catchDeadLinks: [],
  bg1: '',
};

onDOMLoad(getBg());

function myBg() {
  return imageBay[`bg${Math.floor(Math.random() * bgLength().length) + 1}`];
}

function bgLength() {
  return Object.keys(imageBay).filter(elm => /[bg][0-9]/g.test(elm));
}

function callBackground() {
  select('.background__image').style.backgroundImage = `url('${imageBay.bg}')`;
}

function getBgUrl(elm) {
  const bg = elm.style.backgroundImage;
  return bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
}

function catchFourZeroFour(url) {
  const tester = new Image();
  tester.addEventListener('load', imageFound);
  tester.addEventListener('error', imageNotFound);
  //tester.src = url;
}

function imageFound() {
  select('.background__image').style.display = 'inline-flex';
}

function imageNotFound() {
  imageBay.catchDeadLinks.push(imageBay.bg);
  if (bgLength().length - 1 === imageBay.catchDeadLinks.length - 1) {
    console.log(
      'Tabby Tab: ERROR: Recovery failed. No valid background image can be found. Reverting to fallback.',
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

  while (imageBay.catchDeadLinks.indexOf(imageBay.bg) !== -1) {
    myBg();
  }
  select('.background__image').style.backgroundImage = `url('${imageBay.bg}')`;
  catchFourZeroFour(imageBay.bg);
}

function getBg() {
  chrome.storage.sync.get('allData', (items) => {
    // Sets a default BG status
    if (items.allData === null || items.allData === undefined || !items.allData) {
      chrome.storage.sync.set({ allData: vanillaBg, bgID: 'vanilla' }, () => {
        select('.vanilla').classList.add('settings__icon--active');
        imageBay = vanillaBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    } else {
      imageBay = items.allData;
      const image = document.createElement('img');
      image.src = getBgUrl(select('.background__image'));
      image.onload = () => {
        select('.background__image').style.display = 'inline-flex';
      };

      imageBay.bg = myBg();

      callBackground();
      catchFourZeroFour(imageBay.bg);
    }
  });
}
