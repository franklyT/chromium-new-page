//This is pulling from our API now and giving us the right icon
//I'd like to generate my own favicon getter, though

//Favicon parser
chrome.topSites.get(function(items) {
    items.forEach( (elm) => {
      giveUsApples(elm.url, elm.title)
    })

  function appleADay(link) {
    return new Promise(function(resolve, reject) {
    let img = document.createElement("img");
    img.src = `${link}apple-touch-icon.png`

    img.onload = function() {
      resolve(img.src);
    }
    
    img.onerror = function() {
      reject(false);
    }
  });

  }

  async function giveUsApples(link, title=null) {
    let doWeHaveApples = await appleADay(link).then( result => {
      let div = document.createElement("div")
      div.title = title;
      div.classList.add('topsites-box')
      let img = document.createElement("img");
      img.src = result;
      div.appendChild(img);
      select('#topSites').appendChild(div)
      return;
    })
    .catch( error => bruteForce(link, title) );
  }

  async function bruteForce(link, title=null) {
    let reply = await makeRequest("GET", link);
    try {
      reply = reply.match(/<link(.*?)png/gm);
      reply = reply.join("").match(/(?<=href=")(.*?)png/gm);
  
      reply = reply.filter(elm => {
        return elm.split("").length < 150;
      });
    } catch {
      let div = document.createElement("div")
      div.title = title;
      div.classList.add('topsites-box')
      let img = document.createElement("img");
      img.src = "icons/domain.png";
      div.appendChild(img);
      div.addEventListener("click", ()=> {
        window.location.href = link});
      select('#topSites').appendChild(div)
      return;
    }
    
    let div = document.createElement("div")
    div.title = title;

    div.classList.add('topsites-box')
    select('#topSites').appendChild(div)
    let img = document.createElement("img");
    
  
    if (/^https?:\/\//i.test(reply)) {
        
      img.src = reply[reply.length - 1];
      div.addEventListener("click", ()=> {
        window.location.href = link});

    } else {
      img.src = link + "/" + reply[reply.length - 1];
      div.addEventListener("click", ()=> {
        window.location.href = link});
    }
  
    img.onload = function() {
      if (img.width && img.height > 50) {
        div.appendChild(img);

    } else {
        img.src = "icons/domain.png";
        div.addEventListener("click", ()=> {
            window.location.href = link});
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
  });