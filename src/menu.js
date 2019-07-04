/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
document.body.addEventListener('click', () => {
  if (
    event.target !== select('#settingsIcon')
    && !select('#settingsParentNode').contains(event.target)
    && !select('#settings').classList.contains('settings__menu--hidden')
  ) {
    toggleSpin();
    select('.settings').style.pointerEvents = 'none';
    setTimeout(() => {
      select('.settings').style.pointerEvents = '';
    }, 1000);

    select('#settings').classList.add('settings__menu--hidden');
  }
});

select('#settingsIcon').addEventListener('click', () => {
  event.target.style.pointerEvents = 'none';
  toggleSpin();

  select('.settings-menu').classList.toggle('settings__menu--hidden');
  setTimeout(() => {
    select('.settings').style.pointerEvents = '';
  }, 1000);
});

function toggleSpin() {
  if (select('#settings').classList.contains('settings__menu--hidden')) {
    select('.settings').classList.remove('fSpin');
    select('.settings').classList.add('rSpin');
  } else {
    select('.settings').classList.add('fSpin');
    select('.settings').classList.remove('rSpin');
  }
}

select('.settings-menu-name-reset').addEventListener('click', () => {
  callGreetings(true);
});

/* ICONS */
selectAll('.bg-picker').forEach((elm) => {
  elm.addEventListener('click', () => {
    select('.background').display = 'none';

    selectAll('.bg-picker').forEach((nestedElm) => {
      nestedElm.classList.remove('settings__icon--active');
    });
    event.target.classList.add('settings__icon--active');

    if (event.target.id === 'tabby') {
      chrome.storage.sync.set({ allData: tabbyBg, bgID: 'tabby' }, () => {
        imageBay = tabbyBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    } else if (event.target.id === 'cow') {
      chrome.storage.sync.set({ allData: cowBg, bgID: 'cow' }, () => {
        imageBay = cowBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    } else if (event.target.id === 'vanilla') {
      chrome.storage.sync.set({ allData: vanillaBg, bgID: 'vanilla' }, () => {
        imageBay = vanillaBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    }
  });
});

chrome.storage.sync.get('bgID', (items) => {
  select(`#${items.bgID}`).classList.add('settings__icon--active');
});

/* ICONS END */

/* TRAY */

chrome.storage.sync.get('tray', (items) => {
  if (items.tray === undefined || items.tray === null) {
  } else if (items.tray === 'show') {
    select('#trayCheckbox').checked = true;
    select('.settings__tray__icon').classList.add('settings__icon--active');
    select('.tray').classList.remove('display-none');
  } else {
    select('#trayCheckbox').checked = false;
    document.querySelector('.settings__tray__icon').classList.remove('settings__icon--active');
    select('.tray').classList.add('display-none');
  }
});

select('#traySlider').addEventListener('click', () => {
  if (select('#trayCheckbox').checked) {
    chrome.storage.sync.set({ tray: 'hide' }, () => {});
  } else {
    chrome.storage.sync.set({ tray: 'show' }, () => {});
  }
  select('.settings__tray__icon').classList.toggle('settings__icon--active');
  select('.tray').classList.toggle('display-none');
});

/* CALENDAR */

chrome.storage.sync.get('calendar', (items) => {
  if (items.calendar === undefined || items.calendar === null) {
  } else if (items.calendar === 'show') {
    select('#calendarCheckbox').checked = true;
    select('.settings__calendar__icon').classList.add('settings__icon--active');
    select('.calendar').classList.remove('display-none');
  } else {
    select('#calendarCheckbox').checked = false;
    document
      .querySelector('.settings__calendar__icon')
      .classList.remove('settings__icon--active');
    select('.calendar').classList.add('display-none');
  }
});

select('#calendarSlider').addEventListener('click', () => {
  if (select('#calendarCheckbox').checked) {
    chrome.storage.sync.set({ calendar: 'hide' }, () => {});
  } else {
    chrome.storage.sync.set({ calendar: 'show' }, () => {});
  }
  select('.settings__calendar__icon').classList.toggle('settings__icon--active');
  select('.calendar').classList.toggle('display-none');
});

/* TOPSITES */

chrome.storage.sync.get('topsites', (items) => {
  if (items.topsites === undefined || items.topsites === null) {
  } else if (items.topsites === 'show') {
    select('#topsitesCheckbox').checked = true;
    select('.settings__topsites__icon').classList.add('settings__icon--active');
    select('#tsites').classList.remove('display-none');
  } else {
    select('#topsitesCheckbox').checked = false;
    document
      .querySelector('.settings__topsites__icon')
      .classList.remove('settings__icon--active');
    select('#tsites').classList.add('display-none');
  }
});

select('#topsitesSlider').addEventListener('click', () => {
  if (select('#topsitesCheckbox').checked) {
    chrome.storage.sync.set({ topsites: 'hide' }, () => {});
  } else {
    chrome.storage.sync.set({ topsites: 'show' }, () => {});
  }
  select('.settings__topsites__icon').classList.toggle('settings__icon--active');
  select('#tsites').classList.toggle('display-none');
});

/* HISTORY */

chrome.storage.sync.get('recentHistory', (items) => {
  if (items.recentHistory === undefined || items.recentHistory === null) {
  } else if (items.recentHistory === 'show') {
    select('#recentHistoryCheckbox').checked = true;
    select('.settings__recent-history__icon').classList.add('settings__icon--active');
    select('#topsites').classList.remove('display-none');
  } else {
    select('#recentHistoryCheckbox').checked = false;
    document
      .querySelector('.settings__recent-history__icon')
      .classList.remove('settings__icon--active');
    select('#topsites').classList.add('display-none');
  }
});

select('#recentHistorySlider').addEventListener('click', () => {
  if (select('#recentHistoryCheckbox').checked) {
    chrome.storage.sync.set({ recentHistory: 'hide' }, () => {});
  } else {
    chrome.storage.sync.set({ recentHistory: 'show' }, () => {});
  }
  select('.settings__recent-history__icon').classList.toggle('settings__icon--active');
  select('#topsites').classList.toggle('display-none');
});

/* WEATHER */
chrome.storage.sync.get('weather', (items) => {
  if (items.weather === undefined || items.weather === null) {
  } else if (items.weather === 'show') {
    select('#weatherCheckbox').checked = true;
    select('.settings__weather__icon').classList.add('settings__icon--active');
    select('#weather-icons').classList.remove('display-none');
    select('#weather').classList.remove('display-none');
  } else {
    select('#weatherCheckbox').checked = false;
    document.querySelector('.settings__weather__icon').classList.remove('settings__icon--active');
    select('#weather-icons').classList.add('display-none');
    select('#weather').classList.add('display-none');
  }
});

select('.slider').addEventListener('click', () => {
  if (select('#weatherCheckbox').checked) {
    chrome.storage.sync.set({ weather: 'hide' }, () => {});
  } else {
    chrome.storage.sync.set({ weather: 'show' }, () => {});
  }
  select('.settings__weather__icon').classList.toggle('settings__icon--active');
  select('#weather-icons').classList.toggle('display-none');
  select('#weather').classList.toggle('display-none');
});

/* HISTORY ERASER */
select('#historyEraser').addEventListener('click', () => {
  let cQuery = confirm(
    "Are you sure you want to erase your history?\nNote: This will erase your browser's entire history permanently.",
  );
  if (cQuery) {
    chrome.history.deleteAll(() => {
      console.log(
        'Tabby Tab: WARNING: Your web history has been erased. If this is not expected behavior, discontinue Tabby Tab extension use.',
      );
    });
    select('#historyEraser').classList.add('rSpin');
    setTimeout(() => {
      select('#historyEraser').classList.remove('rSpin');
    }, 1000);
    selectAll('.topsites-box').forEach(elm => {
      elm.parentNode.removeChild(elm);
    });
  }
});
/* HISTORY ERASER END */