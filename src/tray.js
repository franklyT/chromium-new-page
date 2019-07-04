/* eslint-disable no-undef */
const defaultTray = {
  news: {
    link: 'https://news.google.com',
    icon: 'icons/news.png',
  },
  music: {
    link: 'https://pandora.com',
    icon: 'icons/music.png',
  },
  reddit: {
    link: 'https://reddit.com',
    icon: 'icons/reddit.png',
  },
  facebook: {
    link: 'https://facebook.com',
    icon: 'icons/facebook.png',
  },
  instagram: {
    link: 'https://instagram.com',
    icon: 'icons/instagram.png',
  },
};

const modifiedTray = {};

Object.keys(defaultTray).forEach((key) => {
  const appender = document.createElement('img');
  appender.style.borderRadius = '3em';
  appender.id = key;
  appender.src = defaultTray[key].icon;

  appender.addEventListener('click', () => {
    window.location.href = defaultTray[key].link;
  });

  select('.tray').firstChild.before(appender);
});
