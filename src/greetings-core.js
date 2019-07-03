onDOMLoad(callGreetings());

let name = "";

function callGreetings(reset = false) {
  chrome.storage.sync.get("name", function(items) {
    if (items.name === undefined || items.name === null || reset === true) {
      var overlay = document.createElement("div");
      overlay.classList.add("name-overlay");
      select("#overlay").appendChild(overlay);

      setTimeout(function() {
        var overlayType = document.createElement("div");
        overlayType.classList.add("typewriter");

        var overlayText = document.createElement("div");
        overlayText.classList.add("typedText");

        var overlayBlink = document.createElement("span");
        overlayBlink.classList.add("blink");
        overlayBlink.innerText = "|";

        overlay.appendChild(overlayType);
        overlayType.appendChild(overlayText);
        overlayType.appendChild(overlayBlink);

        let text = "Oh, hi there!";
        typeWrite(text, 0);

        setTimeout(function() {
          text = "Looks like this is your first time setting up with us.";
          typeWrite(text, 0);

          setTimeout(function() {
            text = "What's your name?";
            typeWrite(text, 0);
            setTimeout(function() {
              var overlayInput = document.createElement("input");
              overlayInput.innerHtml = "";
              overlayInput.id = "overlayInput";
              select("#overlay").appendChild(overlayInput);
              select("#overlayInput").addEventListener("keydown", event => {
                if (event.isComposing || event.keyCode === 13) {
                  chrome.storage.sync.set(
                    { name: select("#overlayInput").value },
                    function() {}
                  );
                  name = select("#overlayInput").value;
                  select(".settings-menu-name").innerHTML = name;
                  select("#greeting").innerHTML = `Hi, ${
                    select("#overlayInput").value
                  }.`;
                  select("#overlay").parentNode.removeChild(select("#overlay"));
                }
              });
            }, 4500);
          }, 5500);
        }, 1500);
      }, 1500);
    } else {
      name = items.name;
      select(".settings-menu-name").innerHTML = name;
      if (randRange(0, 1) === 0) {
        select("#greeting").innerHTML = greetingsList[getDayState()];
      } else {
        select("#greeting").innerHTML = greetingsList.Wildcard;
      }
      console.log(getDayState());
    }
  });
}

// Typewriter
function typeWrite(text, n) {
  if (n < text.length) {
    let paragraph = select(".typedText");
    paragraph.textContent = text.substring(0, n + 1);
    n++;
    setTimeout(function() {
      typeWrite(text, n);
    }, 100);
  }
}
