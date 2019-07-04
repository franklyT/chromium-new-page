/* eslint-disable no-empty */
/* eslint-disable no-undef */
chrome.storage.sync.get('weather', (items) => {
  if (items.weather === undefined || items.weather === null) {
  } else if (items.weather === 'show') {
    select('#weatherCheckbox').checked = true;
    select('.weather-setting-icon').classList.add('active');
    select('#weather-icons').classList.remove('display-none');
    select('#weather').classList.remove('display-none');
  } else {
    select('#weatherCheckbox').checked = false;
    document.querySelector('.weather-setting-icon').classList.remove('active');
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
  select('.weather-setting-icon').classList.toggle('active');
  select('#weather-icons').classList.toggle('display-none');
  select('#weather').classList.toggle('display-none');
});
