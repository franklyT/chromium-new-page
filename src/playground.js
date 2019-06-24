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
let topSites = [];
chrome.topSites.get(function(items) {
    items.forEach( (elm)=> {
        topSites.push(elm)
    });
// This is pulling from our API now and giving us the right icon
// I'd like to generate my own favicon getter, though
  console.log(topSites[0].url)
    select('.topsites-box').style.backgroundImage = `url(https://api.faviconkit.com/${topSites[0].url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}/144)`;
});

// Testing grab favicon for topsites
console.log(`https://plus.google.com/_/favicon?domain_url=http://www.stackoverflow.com`)