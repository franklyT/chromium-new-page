/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
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
