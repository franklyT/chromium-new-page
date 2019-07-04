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
