chrome.storage.sync.get("name", function(items) {
  if (items.name === undefined || items.name === null) {
    var overlay = document.createElement("div");
    var overlayInput = document.createElement("input");
    overlay.innerHTML = "";
    overlayInput.innerHtml = "";
    overlayInput.id = "overlayInput";
    overlay.classList.add("name-overlay");
    document.querySelector("#overlay").appendChild(overlay);
    document.querySelector("#overlay").appendChild(overlayInput);
    document
      .querySelector("#overlayInput")
      .addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 13) {

          chrome.storage.sync.set(
            { name: document.querySelector("#overlayInput").value },
            function() {}
          );
          document
            .querySelector("#overlay")
            .parentNode.removeChild(document.querySelector("#overlay"));
        }
      });
  } else {
      console.log(items.name)
  }
});
