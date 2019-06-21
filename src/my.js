let imageBay = {};
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
