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
    })

    topSites.forEach((elm)=> {
        let newBox = document.createElement('div');
        newBox.classList.add('topsites-box');
        newBox.title = elm.title
        newBox.addEventListener("click", ()=> {
        window.location.href = topSites[topSites.indexOf(elm)].url
        })
        select('#topSites').appendChild(newBox);
        faviconParser(topSites[topSites.indexOf(elm)].url, newBox)
    })
});

// This is pulling from our API now and giving us the right icon
// I'd like to generate my own favicon getter, though
// console.log(topSites[0].url)


 //   select('.topsites-box').style.backgroundImage = `url(https://api.faviconkit.com/${topSites[0].url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}/144)`;
   // select('.topsites-box').addEventListener("click", () => {
    //    window.location.href = topSites[0].url;
   // })



// Testing grab favicon for topsites
//console.log(`https://plus.google.com/_/favicon?domain_url=http://www.stackoverflow.com`)

// Favicon parser
let indexedQ = '';

function faviconParser(link, elm='') {
let indexed;
let xhr = new XMLHttpRequest();
xhr.open('GET', link, true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            indexed = xhr.responseText;
            try {
            indexed = indexed.match(/http.*(png)/gm).join(' ').split(' ')
                                    .filter( (elm)=> {
                                            return (elm.match(/^.*icon.*$/gm))
                                        }).join(' ').match(/.*htt.*png$/gm).join(' ').split(' ')
            
                                        indexed = indexed.filter((elm)=> {
                 return (elm.match(/png/g))
            })
            if (indexed.length-1 > 0) {
                indexed =   indexed.reduce((a,b)=> {
                    return a.match(/[^a-zA-Z]{3}.png/gm) > b.match(/[^a-zA-Z]{3}.png/gm) ? a : b;
                })
            }
            indexedQ = indexed;
            elm.style.backgroundImage = `url(${indexedQ})`
        }
        catch(err) {

            indexedQ = 'Error: Favicon cannot be gathered via default script method. Trying method 2.';
            let img = document.createElement("img");
                img.src = `${link}apple-touch-icon.png`;
            img.onload = function() {
                if (img.width > 50 && img.height > 50) {
                indexedQ = `${link}apple-touch-icon.png`;
                elm.style.backgroundImage = `url(${indexedQ})`
                } else {
                    elm.style.backgroundImage = `url(/icons/domain.png)`    
                    console.log('Favicon too small.')}
            }
            img.onerror = function() {
                elm.style.backgroundImage = `url(/icons/domain.png)`    
                console.log(`No favicon gathered.`)
            } 
        }
        }
    }
};
xhr.send(null);
}

//async function returnFavicon(link) {
    //    await faviconParser(link);
    //    console.log(indexedQ);
  //  }
 // async function Q()  {
  //  indexedQ = null;
  // faviconParser(`https://stackoverflow.com`);
   // let result = await indexedQ;
   // return result;
 // }


  //  document.body.addEventListener("click", ()=> console.log(indexedQ));



  //  function caller() {
    //    let x= returnFavicon(`https://www.reddit.com`)
   // setTimeout(()=> {
     //   console.log(x)
   // }, 2000);
    //}
    //caller()