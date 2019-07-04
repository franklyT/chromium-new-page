/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const greetingsList = {
  get Morning() {
    const morningArray = [
      `Good morning, ${name}.`,
      `Morning, ${name}!`,
      `Rise and shine, ${name}.`,
      `Buenos dias, ${name}.`,
      `Ciao, ${name}.`,
      `Konichiwa, ${name}-san.`,
    ];
    return morningArray[randRange(0, morningArray.length - 1)];
  },

  get Afternoon() {
    // Placeholder, keeping consistency for extensibility
    const afternoonArray = [`Good afternoon, ${name}.`];
    return afternoonArray[randRange(0, afternoonArray.length - 1)];
  },
  get Night() {
    // Placeholder, keeping consistency for extensibility
    const nightArray = [`Good evening, ${name}.`];
    return nightArray[randRange(0, nightArray.length - 1)];
  },

  get Wildcard() {
    const wildcardArray = [
      `Hi there ${name}.`,
      `Hey, ${name}.`,
      `What's up, ${name}?`,
      `Greetings, ${name}.`,
      'GREETINGS!',
      `Salute, ${name}.`,
      `Howdy, ${name}.`,
      `Yo, ${name}.`,
      `Good day, ${name}.`,
      `Hello, ${name}.`,
      `Hi, ${name}.`,
      `How are things, ${name}?`,
      `How's it going, ${name}?`,
      `Sup', ${name}?`,
      `What's new, ${name}?`,
      `Well, hello, ${name}.`,
      `Hey, what's up, ${name}?`,
      `Hiya, ${name}.`,
      `How's everything, ${name}?`,
      `Long time no see, ${name}.`,
    ];
    return wildcardArray[randRange(0, wildcardArray.length - 1)];
  },
  // get Holiday() {}
};

onDOMLoad(callGreetings());

let name = '';

function callGreetings(reset = false) {
  chrome.storage.sync.get('name', (items) => {
    if (items.name === undefined || items.name === null || reset === true) {
      const overlay = document.createElement('div');
      overlay.classList.add('name-overlay');
      select('#overlay').appendChild(overlay);

      setTimeout(() => {
        const overlayType = document.createElement('div');
        overlayType.classList.add('typewriter');

        const overlayText = document.createElement('div');
        overlayText.classList.add('typedText');

        const overlayBlink = document.createElement('span');
        overlayBlink.classList.add('blink');
        overlayBlink.innerText = '|';

        overlay.appendChild(overlayType);
        overlayType.appendChild(overlayText);
        overlayType.appendChild(overlayBlink);

        let text = 'Oh, hi there!';
        typeWrite(text, 0);

        setTimeout(() => {
          text = 'Looks like this is your first time setting up with us.';
          typeWrite(text, 0);

          setTimeout(() => {
            text = "What's your name?";
            typeWrite(text, 0);
            setTimeout(() => {
              const overlayInput = document.createElement('input');
              overlayInput.innerHtml = '';
              overlayInput.id = 'overlayInput';
              select('#overlay').appendChild(overlayInput);
              select('#overlayInput').addEventListener('keydown', (event) => {
                if (event.isComposing || event.keyCode === 13) {
                  chrome.storage.sync.set({ name: select('#overlayInput').value }, () => {});
                  name = select('#overlayInput').value;
                  select('.settings-menu-name').innerHTML = name;
                  select('#greeting').innerHTML = `Hi, ${select('#overlayInput').value}.`;
                  select('#overlay').parentNode.removeChild(select('#overlay'));
                }
              });
            }, 4500);
          }, 5500);
        }, 1500);
      }, 1500);
    } else {
      // eslint-disable-next-line prefer-destructuring
      name = items.name;
      select('.settings-menu-name').innerHTML = name;
      if (randRange(0, 1) === 0) {
        select('#greeting').innerHTML = greetingsList[getDayState()];
      } else {
        select('#greeting').innerHTML = greetingsList.Wildcard;
      }
    }
  });
}

// Typewriter
function typeWrite(text, n) {
  if (n < text.length) {
    const paragraph = select('.typedText');
    const m = n + 1;
    paragraph.textContent = text.substring(0, m);
    setTimeout(() => {
      typeWrite(text, m);
    }, 100);
  }
}
