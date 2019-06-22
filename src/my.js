// init UI
//document.querySelector('#masterContainer').style.display = "";

chrome.storage.sync.get("weather", function(items) {
  if (items.weather === undefined || items.weather === null) {

  } else {
    if (items.weather === 'show') {
      document.querySelector('#weatherCheckbox').checked = true;
      document.querySelector('.weather-setting-icon').classList.add('active');
      document.querySelector('#weatherIcons').classList.remove('display-none');
      document.querySelector('#weather').classList.remove('display-none');  
  

    } else {
      document.querySelector('#weatherCheckbox').checked = false;
      document.querySelector('.weather-setting-icon').classList.remove('active');
      document.querySelector('#weatherIcons').classList.add('display-none');
      document.querySelector('#weather').classList.add('display-none');  
    }
  }
});


document.querySelector('.slider').addEventListener("click", function() {
  if (document.querySelector('#weatherCheckbox').checked) {
    chrome.storage.sync.set({ weather: 'hide' }, function() 
    {
    });
  
  } else {
    chrome.storage.sync.set({ weather: 'show' }, function() {

    });
  
  }
    document.querySelector('.weather-setting-icon').classList.toggle('active');
    document.querySelector('#weatherIcons').classList.toggle('display-none');
    document.querySelector('#weather').classList.toggle('display-none');  
});


function gSearch() {
  window.location.href = `http://www.google.com/search?q=${
    document.querySelector(".search").value
  }`;
}

document.querySelector(".submit").addEventListener("click", function() {
  gSearch();
});

document.querySelector(".search").addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 13) {
    gSearch();
  }
});

document.querySelector("#settingsIcon").addEventListener("click", function() {
  event.target.style.pointerEvents  = "none";
  event.target.classList.toggle('active');
  document.querySelector('.settings-menu').classList.toggle('hidden');
  setTimeout(
    function() {
      document.querySelector('.settings').classList.toggle('active');
      document.querySelector('.settings').style.pointerEvents  = "";

    }, 1000);
});

/* function ready() {
  document.querySelector(".search").focus();
};
*/

/**
 * Remove existing favicon(s) and create a new one
 * @param new_icon
 * @returns {boolean}
 */
processIcon = function(new_icon) {
  var el, icon, link;

  el = document.querySelectorAll('head link[rel*="icon"]');

  // Remove existing favicons
  Array.prototype.forEach.call(el, function(node) {
    node.parentNode.removeChild(node);
  });

  // Set preconfigured or custom (http|https|data) icon
  icon =
    /^(https?|data):/.test(new_icon) === true
      ? new_icon
      : chrome.extension.getURL(new_icon);

  // Create new favicon
  link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "icon";
  link.href = icon;

  document.getElementsByTagName("head")[0].appendChild(link);

  return true;
};

processIcon("favicon128.png");
