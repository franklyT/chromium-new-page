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
// console.log(topSites[0].url)
    select('.topsites-box').style.backgroundImage = `url(https://api.faviconkit.com/${topSites[0].url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}/144)`;
    select('.topsites-box').addEventListener("click", () => {
        window.location.href = topSites[0].url;
    })
});



// Testing grab favicon for topsites
//console.log(`https://plus.google.com/_/favicon?domain_url=http://www.stackoverflow.com`)

// Favicon parser?
function faviconParser(link) {
let indexed;
var xhr = new XMLHttpRequest();
xhr.open('GET', link, true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            indexed = xhr.responseText;
            indexed = indexed.match(/http(.*?).png/g).join(' ').split(' ')
                                    .filter( (elm)=> {
                                            return (elm.indexOf('favicon') !== -1)
                                        }).join(' ').match(/http.*[^a-zA-Z]{3}.png /gm).join(' ').split(' ')
  
  
  
            indexed = indexed.filter((elm)=> {
                 return (elm.match(/[^a-zA-Z]{3}.png/gm))
            }).reduce((a,b)=> {
                return a.match(/[^a-zA-Z]{3}.png/gm) > b.match(/[^a-zA-Z]{3}.png/gm) ? a : b;
            })
        }
    }
    console.log()
    return indexed;
};
xhr.send(null);
}

async function returnFavicon(link) {
        const x = await faviconParser(link);
        console.log(x)
        return x;
    }

    function caller() {
        let x= returnFavicon(`https://www.reddit.com`)
    setTimeout(()=> {
        console.log(x)
    }, 2000);
    }
    caller()