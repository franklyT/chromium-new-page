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
      try {
      if (!data[attempt].url.includes("google") && !data[attempt].url.includes("gmail") ) {
        returnCount++;
        giveUsApples(data[attempt].url, data[attempt].title);
      }
    }
    catch {
    }
    }
  });
}


function appleADay(link, title) {
  return new Promise(function(resolve, reject) {
    let div = document.createElement("div");
    div.setAttribute('data-title', title);
    div.setAttribute('data-link', link);

    div.classList.add("topsites-box");

    let img = document.createElement("img");
    img.src = `${link.match(/^(https:\/\/.*?)\//)[1]}/apple-touch-icon.png`;
  
    img.onload = function() {
      if (img.width && img.height > 50) {
        resolve(img.src);
      } else {
        reject(`${img.src} too small. Trying another method...`);
      }
    };
    img.onerror = function() {
      reject('Touch icon load failed. Trying another method...');
    };
  });
}

async function giveUsApples(link, title = null) {
  await appleADay(link, title)
    .then((result)=> {
      let div = document.createElement("div");
      linkLink(div, link);

      div.setAttribute('data-title', title);
      div.setAttribute('data-link', link);

      div.classList.add("topsites-box");

      let img = document.createElement("img");
      img.src = result;
      div.appendChild(img);
      select("#topSites").appendChild(div);
    })
    .catch((reject)=> {
      console.log(reject)
      bruteForce(link.match(/^(https:\/\/.*?)\//)[1], title);
    });
}

async function bruteForce(link, title = null) {
  await makeRequest("GET", link)
    .then(response => {
      let meta = response;
      let linked = response;
      let pushArray = [];
      let linkArray = [];
      //reply = response.match(/<link(.*?)png/gm);
      //reply = reply.join("").match(/(?<=href=")(.*?)png/gm);
     // reply = reply.filter(elm => {
      //  return elm.split("").length < 150;
     //});

     try {
     while (linked.indexOf("<link") !== -1) {
      linked = linked.slice(linked.indexOf("<link"), linked.length);
      pushArray.push(linked.slice(0, linked.indexOf(">")));
      linked = linked.slice(linked.indexOf(">"), linked.length);
    }
  
    pushArray.forEach((elm) => {
      if (elm.indexOf("png") !== -1 || elm.indexOf("PNG") !== -1) {
        linkArray.push(elm.match(/href="(.*.png)/)[1]);
      }
    });
  }
  catch {
  }
  try {
  while (meta.indexOf("<meta") !== -1) {
      meta = meta.slice(meta.indexOf("<meta"), meta.length);
      pushArray.push(meta.slice(0, meta.indexOf(">")));
      meta = meta.slice(meta.indexOf(">"), meta.length);
    }

    pushArray.forEach((elm) => {
      if ((elm.indexOf("png") !== -1 || elm.indexOf("PNG") !== -1) && elm.indexOf("http") !== -1) {
          linkArray.push((elm).match(/content="(.*.png)"/)[1]);
      }
    });
  }
  catch {

  }

    etTuBrute(link, title, linkArray[linkArray.length-1], link);
    //etTuBrute(reply);
  })
    .catch((error) => {
      console.log(error)

      let div = document.createElement("div");
      linkLink(div, link);
      div.setAttribute('data-title', title);
      div.setAttribute('data-link', link);

      div.classList.add("topsites-box");

      let img = document.createElement("img");
      img.src = "icons/domain.png";
      div.appendChild(img);
      select("#topSites").appendChild(div);
    });

  function etTuBrute(link, title, reply) {
    let div = document.createElement("div");
    linkLink(div, link);

    div.setAttribute('data-title', title);
    div.setAttribute('data-link', link);

    div.classList.add("topsites-box");
    select("#topSites").appendChild(div);
    let img = document.createElement("img");

    if (/^https?:\/\//i.test(reply)) {
    img.src = reply;
  } else {
    img.src = link + "/" + reply;
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
