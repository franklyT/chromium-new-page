// Freeze BG sound effect
// https://freesound.org/people/JustInvoke/sounds/446112/
select(".freeze").addEventListener("click", () => {
  new Audio("audio/freeze-sound.wav").play();
});

// Playing around with this for now
// setTimeout(function() {
//  console.log(greetingsList.morning[randRange(0, greetingsList.morning.length-1)]); }, 1000);

// History - do i need to build this to replace chrome.topSites?
// What if I just do recents instead?!
//chrome.history.search({text: '', maxResults: 10}, function(data) {
// data.forEach(function(page) {
//          console.log(page.url);
//  });
//});

// ICON FOR NOT FOUND SHOULD BE FIRST LETTER OF URL