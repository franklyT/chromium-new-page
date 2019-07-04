/* eslint-disable no-undef */
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
