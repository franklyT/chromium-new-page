chrome.storage.sync.get("name", function(items) {
  if (items.name === undefined) {
    var overlay = document.createElement("div"); 
    var overlayInput = document.createElement("input"); 
    overlay.innerHTML = "";
    overlayInput.innerHtml = 'dsasddasdsa';
    overlayInput.id = "overlayInput"
    overlay.classList.add('name-overlay')                 
    document.querySelector('#overlay').appendChild(overlay);    
    document.querySelector('#overlay').appendChild(overlayInput);    
    document.querySelector("#overlayInput").addEventListener("click", function() {
    document.querySelector('#overlay').parentNode.removeChild(document.querySelector('#overlay'))
    });     
} else {
    console.log("name found");
  }
});
