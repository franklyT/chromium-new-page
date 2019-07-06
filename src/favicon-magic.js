onDOMLoad(pullRecentSites());

function linkLink(div, link) {
  div.addEventListener('click', () => {
    window.location.href = link;
  });
}

function pullRecentSites() {
  chrome.history.search({ text: '', maxResults: 100 }, (data) => {
    for (let attempt = 0, returnCount = 0; attempt < 100 && returnCount < 5; attempt += 1) {
      try {
        // I'm not inclined to over-ping google which will hand out captchas pretty quickly
        if (!data[attempt].url.includes('google') && !data[attempt].url.includes('gmail')) {
          returnCount += 1;
          giveUsApples(data[attempt].url, data[attempt].title, 'topsites');
        }
      } catch (e) {
        // suppressing this error
      }
    }
  });
}

function appleADay(link, title, domElement) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    div.setAttribute('data-title', title);
    div.setAttribute('data-link', link);
    try {
      div.setAttribute(
        'data-shortlink',
        link.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''),
      );
    } catch (e) {
      div.setAttribute('data-shortlink', link);
    }

    div.classList.add(`${domElement}-box`);

    const img = document.createElement('img');
    try {
      img.src = `${link.match(/^(https:\/\/.*?)\//)[1]}/apple-touch-icon.png`;
    } catch (e) {
      img.src = `${link}/apple-touch-icon.png`;
    }

    img.onload = () => {
      if (img.width && img.height > 50) {
        resolve(img.src);
      } else {
        reject(new Error(`${img.src} too small. Trying another method...`));
      }
    };
    img.onerror = () => {
      reject(new Error('Touch icon load failed. Trying another method...'));
    };
  });
}

async function giveUsApples(link, title = null, domElement) {
  await appleADay(link, title, domElement)
    .then((result) => {
      const div = document.createElement('div');
      linkLink(div, link);

      div.setAttribute('data-title', title);
      div.setAttribute('data-link', link);
      try {
        div.setAttribute(
          'data-shortlink',
          link.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''),
        );
      } catch (e) {
        div.setAttribute('data-shortlink', link);
      }

      div.classList.add(`${domElement}-box`);

      const img = document.createElement('img');
      img.src = result;
      div.appendChild(img);
      select(`#${domElement}`).appendChild(div);
    })
    .catch((reject) => {
      console.log(reject);
      bruteForce(link, title, domElement);
    });
}

async function bruteForce(link, title = null, domElement) {
  let linked = link;
  try {
    linked = link.match(/^(https:\/\/.*?)\//)[1];
  } catch (e) {
    linked = link;
  }
  await makeRequest('GET', linked)
    .then((response) => {
      let meta = response;
      linked = response;
      const pushArray = [];
      const linkArray = [];
      try {
        while (linked.indexOf('<link') !== -1) {
          linked = linked.slice(linked.indexOf('<link'), linked.length);
          pushArray.push(linked.slice(0, linked.indexOf('>')));
          linked = linked.slice(linked.indexOf('>'), linked.length);
        }

        pushArray.forEach((elm) => {
          if (elm.indexOf('png') !== -1 || elm.indexOf('PNG') !== -1) {
            linkArray.push(elm.match(/href="(.*?.png)/)[1]);
          }
        });
      } catch (e) {
        // suppressing this error
      }
      try {
        while (meta.indexOf('<meta') !== -1) {
          meta = meta.slice(meta.indexOf('<meta'), meta.length);
          pushArray.push(meta.slice(0, meta.indexOf('>')));
          meta = meta.slice(meta.indexOf('>'), meta.length);
        }

        pushArray.forEach((elm) => {
          if (
            (elm.indexOf('png') !== -1 || elm.indexOf('PNG') !== -1)
            && elm.indexOf('http') !== -1
          ) {
            linkArray.push(elm.match(/content="(.*?.png)"/)[1]);
          }
        });
      } catch (e) {
        // suppressing this error
      }

      etTuBrute(link, title, linkArray[linkArray.length - 1], domElement);
    })
    .catch((error) => {
      console.log(error);
      const div = document.createElement('div');
      linkLink(div, link);
      div.setAttribute('data-title', title);
      div.setAttribute('data-link', link);
      try {
        div.setAttribute(
          'data-shortlink',
          link.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''),
        );
      } catch (e) {
        div.setAttribute('data-shortlink', link);
      }

      div.classList.add(`${domElement}-box`);

      const img = document.createElement('img');
      img.src = 'icons/domain.png';
      div.appendChild(img);
      select(`#${domElement}`).appendChild(div);
    });
}
function etTuBrute(link, title, reply, domElement) {
  const div = document.createElement('div');
  linkLink(div, link);

  div.setAttribute('data-title', title);
  div.setAttribute('data-link', link);
  try {
    div.setAttribute(
      'data-shortlink',
      link.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''),
    );
  } catch (e) {
    div.setAttribute('data-shortlink', link);
  }

  div.classList.add(`${domElement}-box`);
  select(`#${domElement}`).appendChild(div);
  const img = document.createElement('img');

  if (/^https?:\/\//i.test(reply)) {
    img.src = reply;
  } else {
    img.src = `${link}/${reply}`;
  }
  img.onload = () => {
    if (img.width && img.height > 50) {
      div.appendChild(img);
    } else {
      const imgRebound = document.createElement('img');
      imgRebound.src = 'icons/domain.png';
      div.appendChild(imgRebound);
    }
  };

  img.onerror = () => {
    const imgRebound = document.createElement('img');
    imgRebound.src = 'icons/domain.png';
    div.appendChild(imgRebound);
  };
}

function makeRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.timeout = 3000;
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`${xhr.status}${xhr.statusText}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error(`${xhr.status}${xhr.statusText}`));
    };

    xhr.send();
  });
}
