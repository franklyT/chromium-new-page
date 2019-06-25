//This is pulling from our API now and giving us the right icon
//I'd like to generate my own favicon getter, though

//Favicon parser
chrome.topSites.get(function(items) {
    items.forEach( (elm) => {
        bruteForce(elm.url)
    })

  async function bruteForce(link) {
    let reply = await makeRequest("GET", link);
    let result = reply;
    try {
      result = result.match(/<link(.*?)png/gm);
      result = result.join("").match(/(?<=href=")(.*?)png/gm);
  
      result = result.filter(elm => {
        return elm.split("").length < 150;
      });
    } catch {
      let div = document.createElement("div")
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

    div.classList.add('topsites-box')
    select('#topSites').appendChild(div)
    let img = document.createElement("img");
    
  
    if (/^https?:\/\//i.test(result)) {
        
      img.src = result[result.length - 1];
      div.addEventListener("click", ()=> {
        window.location.href = link});

    } else {
      img.src = link + "/" + result[result.length - 1];
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
  
  // if href !== https, parse entire string, else parse string as domain + string
});