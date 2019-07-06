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

  appender.addEventListener(
    'contextmenu',
    (ev) => {
      ev.preventDefault();
      if (select('.traypop')) {
        select('.traypop').parentNode.removeChild(select('.traypop'));
      }
      const traypopper = document.createElement('div');
      traypopper.classList.add('traypop');
      traypopper.innerHTML = 'Remove<br>Edit';

      traypopper.style.top = `${event.clientY-65}px`;
      traypopper.style.left = `${event.clientX}px`;
      document.body.appendChild(traypopper);
      return false;
    },
    false,
  );

  select('.tray').firstChild.before(appender);
});

document.body.addEventListener('click', (elm) => {
  try {
    if (!elm.target.classList.contains('traypop')) {
      select('.traypop').parentNode.removeChild(select('.traypop'));
    }
  } catch {
    // suppress error
  }
});
