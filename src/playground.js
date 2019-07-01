// Freeze BG sound effect
// https://freesound.org/people/JustInvoke/sounds/446112/
select('.freeze').addEventListener("click", () => {
    new Audio('audio/freeze-sound.wav').play();
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


chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  var init = { 
    'method' : 'GET',
    'async'  : true,
    'headers': {
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };

  const headers = new Headers({
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json',
  })

  const queryParams = { headers };

  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
  .then((response) => response.json()) // Transform the data into json
  .then(function(data) {

       const getLast = data.items.reduce((a,b)=> {
         return a.start.dateTime > b.start.dateTime ? a : b;
       });

      
       // console.log(getLast);
      // console.log(getLast.start.dateTime)
      let calDiv = document.createElement('div');
      calDiv.classList.add('calendar-event')
      calDiv.innerHTML = `<img class="calendar__icon" src="icons/calicon.png"></img><span class='event'>${getLast.summary}</span><span class='time'>${dateConverter(getLast.start.dateTime.substring(0, 10))} • ${timeConverter(getLast.start.dateTime.substring(11, 16))}</span>`
      
      if (getLast.location) {
        calDiv.innerHTML += `<span class='description'>•&nbsp;&nbsp${getLast.location}</span>`;
      }
      if (getLast.description) {
        calDiv.innerHTML += `&nbsp;&nbsp; <span class='description'>${getLast.description}</span> `;
      }
      select('.cal').appendChild(calDiv);
     //  console.log(getLast);
      //console.log(getLast.start.dateTime.substring(0, 10));
    })
  })

  // Do something with this?
  chrome.topSites.get(function(info){
    for(let i = 0; i<5; i++) {
      //let tSite = document.createElement('div');
      //tSite.classList.add('tsites-box')
    //  tSite.addEventListener("click", () => {
      //  window.location.href = info[i].url;
     // });
    
    //  select('#tsites').appendChild(tSite)
      giveUsApples(info[i].url, info[i].title, 'tsites');
      // let tSites = selectAll('.tsites-box');
      // tSites[tSites.length-1].innerHTML += info[i].url.match(/^(https:\/\/.*?)\//)[1]
    }
   });