onDOMLoad(pullRecentSites());

function linkLink(div, link) {
  div.addEventListener("click", () => {
    window.location.href = link;
  });
}

function pullRecentSites() {
  chrome.history.search({ text: "", maxResults: 100 }, function(data) {
    for (
      let attempt = 0, returnCount = 0;
      attempt < 100 && returnCount < 5;
      attempt++
    ) {
      if (!data[attempt].url.includes("google")) {
        returnCount++;
        giveUsApples(data[attempt].url, data[attempt].title);
      }
    }
  });
}

function appleADay(link, title) {
  return new Promise(function(resolve, reject) {
    let div = document.createElement("div");
    div.title = title;
    div.classList.add("topsites-box");

    let img = document.createElement("img");
    img.src = `${link}apple-touch-icon.png`;
    img.onload = function() {
      if (img.width && img.height > 50) {
        resolve(img.src);
      } else {
        reject(`${img.src} too small. Trying another method...`);
      }
    };
    img.onerror = function() {
      //console.log('Touch icon load failed. Trying another method...');
      reject();
    };
  });
}

async function giveUsApples(link, title = null) {
  await appleADay(link, title)
    .then(result => {
      let div = document.createElement("div");
      linkLink(div, link);

      div.title = title;
      div.classList.add("topsites-box");

      let img = document.createElement("img");
      img.src = result;
      div.appendChild(img);
      select("#topSites").appendChild(div);
    })
    .catch(reject => {
      bruteForce(link, title);
    });
}

async function bruteForce(link, title = null) {
  let reply = "";
  await makeRequest("GET", link)
    .then(response => {
      reply = response.match(/<link(.*?)png/gm);
      reply = reply.join("").match(/(?<=href=")(.*?)png/gm);
      reply = reply.filter(elm => {
        return elm.split("").length < 150;
      });
      etTuBrute(link, title, reply);
    })
    .catch(() => {
      let div = document.createElement("div");
      linkLink(div, link);
      div.title = title;
      div.classList.add("topsites-box");

      let img = document.createElement("img");
      img.src = "icons/domain.png";
      div.appendChild(img);
      select("#topSites").appendChild(div);
    });

  function etTuBrute(link, title, reply) {
    let div = document.createElement("div");
    linkLink(div, link);

    div.title = title;

    div.classList.add("topsites-box");
    select("#topSites").appendChild(div);
    let img = document.createElement("img");

    if (/^https?:\/\//i.test(reply)) {
      img.src = reply[reply.length - 1];
    } else {
      img.src = link + "/" + reply[reply.length - 1];
    }

    img.onload = function() {
      if (img.width && img.height > 50) {
        div.appendChild(img);
      } else {
        img.src = "icons/domain.png";
        div.appendChild(img);
      }
    };

    img.onerror = function() {
      img.src = "icons/domain.png";
      div.appendChild(img);
    };
  }
}

function makeRequest(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}
