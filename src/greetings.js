chrome.storage.sync.get("name", function(items) {
  if (items.name === undefined || items.name === null) {
    
    var overlay = document.createElement("div");
    overlay.classList.add("name-overlay");
    document.querySelector("#overlay").appendChild(overlay);

    setTimeout(function(){
          
    var overlayType = document.createElement("div");
    overlayType.classList.add("typewriter");

    var overlayText = document.createElement("div");
    overlayText.classList.add("typedText");

    var overlayBlink = document.createElement("span");
    overlayBlink.classList.add("blink");
    overlayBlink.innerText= "|";

    
    overlay.appendChild(overlayType);
    overlayType.appendChild(overlayText);
    overlayType.appendChild(overlayBlink);


    let text = 'Oh, hi there!';
    typeWrite(text, 0);

    setTimeout(function(){
      text = 'Looks like this is your first time setting up with us.';
      typeWrite(text, 0);

      setTimeout(function(){
        text = "What's your name?"
        typeWrite(text, 0);
        setTimeout(function(){
          var overlayInput = document.createElement("input");
          overlayInput.innerHtml = "";
          overlayInput.id = "overlayInput";
          document.querySelector("#overlay").appendChild(overlayInput);
          document.querySelector("#overlayInput").addEventListener("keydown", event => {
            if (event.isComposing || event.keyCode === 13) {
    
              chrome.storage.sync.set(
                { name: document.querySelector("#overlayInput").value },
                function() {}
              );
              document.querySelector('#greeting').innerHTML = `Hi, ${document.querySelector("#overlayInput").value}.`;
              document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
            }
          });
  
        }, 4500);

      }, 5500);
      
    }, 1500);

    }, 1500);

  } else {
      console.log(items.name)
      document.querySelector('#greeting').innerHTML = `Hi, ${items.name}.`;
  }
});

// Typewriter
function typeWrite(text, n) {
  
  if (n < (text.length)) {
   
 let paragraph = document.querySelector('.typedText');
    paragraph.textContent = text.substring(0, n+1);
    n++;
    setTimeout(function() {
      typeWrite(text, n)
    }, 100);
  }
}