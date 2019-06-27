//Favicon parser
onDOMLoad(pullRecentSites());


function pullRecentSites() {
  chrome.history.search({ text: "", maxResults: 100 }, function(data) {
    for (let attempt = 0, returnCount = 0; attempt < 100 && returnCount < 5; attempt++) {
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
        // Image was too small
      }
    };
    img.onerror = function() {
      reject("Load failed. Trying another method...");
    };
  });
}

async function giveUsApples(link, title = null) {
  await appleADay(link, title)
    .then(result => {
      let div = document.createElement("div");
      div.title = title;
      div.classList.add("topsites-box");

      let img = document.createElement("img");
      img.src = result;
      div.appendChild(img);
      select("#topSites").appendChild(div);
      return;
    })
    .catch(reject => {
      console.log(reject);
      bruteForce(link, title);
    });
}

async function bruteForce(link, title = null) {
  let reply = await makeRequest("GET", link);
  try {
    reply = reply.match(/<link(.*?)png/gm);
    reply = reply.join("").match(/(?<=href=")(.*?)png/gm);

    reply = reply.filter(elm => {
      return elm.split("").length < 150;
    });
  } catch {
    let div = document.createElement("div");
    div.title = title;
    div.classList.add("topsites-box");

    let img = document.createElement("img");
    img.src = "icons/domain.png";
    div.appendChild(img);
    div.addEventListener("click", () => {
      window.location.href = link;
    });
    select("#topSites").appendChild(div);
    return;
  }

  let div = document.createElement("div");
  div.title = title;

  div.classList.add("topsites-box");
  select("#topSites").appendChild(div);
  let img = document.createElement("img");

  if (/^https?:\/\//i.test(reply)) {
    img.src = reply[reply.length - 1];
    div.addEventListener("click", () => {
      window.location.href = link;
    });
  } else {
    img.src = link + "/" + reply[reply.length - 1];
    div.addEventListener("click", () => {
      window.location.href = link;
    });
  }

  img.onload = function() {
    if (img.width && img.height > 50) {
      div.appendChild(img);
    } else {
      img.src = "icons/domain.png";
      div.addEventListener("click", () => {
        window.location.href = link;
      });
      div.appendChild(img);
    }
  };

  img.onerror = function() {
    img.src = "icons/domain.png";
    div.appendChild(img);
  };
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
