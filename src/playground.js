// Freeze BG sound effect
// https://freesound.org/people/JustInvoke/sounds/446112/
select('.freeze').addEventListener("click", () => {
    var audio = new Audio('audio/freeze-sound.wav');
    audio.play();
  });

  
// Playing around with this for now
setTimeout(function() {
    console.log(greetingsList.morning[randRange(0, greetingsList.morning.length-1)]);
}, 1000);

// Testing topsites
chrome.topSites.get(function(items) {
    console.log(items)
  });

// Testing grab favicon