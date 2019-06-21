chrome.storage.sync.get("name", function(items) {
  if (items.name === undefined || items.name === null) {
    var overlay = document.createElement("div");
    var overlayInput = document.createElement("input");
    overlay.innerHTML = "";
    overlayInput.innerHtml = "dsasddasdsa";
    overlayInput.id = "overlayInput";
    overlay.classList.add("name-overlay");
    document.querySelector("#overlay").appendChild(overlay);
    document.querySelector("#overlay").appendChild(overlayInput);
    document
      .querySelector("#overlayInput")
      .addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 13) {
            
            console.log(document.querySelector('#overlayInput'))

            chrome.storage.sync.set({ name: document.querySelector('#overlayInput').value }, function() {
            });
            document
            .querySelector("#overlay")
            document.querySelector('#greeting').innerHTML = `Hi, ${document.querySelector('#overlayInput').value}`
            .parentNode.removeChild(document.querySelector("#overlay"));
        }
      });
  } else {
      document.querySelector('#greeting').innerHTML = `Welcome back, ${items.name}.`
  }
});
