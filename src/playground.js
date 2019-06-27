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
      'Content-Type': 'application/json'
  })

  const queryParams = { headers };

  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
  .then((response) => response.json()) // Transform the data into json
  .then(function(data) {
      // console.log(data.items[data.items.length-1]);
      // console.log(data.items[data.items.length-1].start.dateTime)
      let calDiv = document.createElement('div');
      calDiv.innerHTML = `Upcoming Event: ${data.items[data.items.length-1].start.dateTime.substring(0, 10)} ${timeConverter(data.items[data.items.length-1].start.dateTime.substring(11, 16))} - ${data.items[data.items.length-1].summary}`
      calDiv.classList.add('calendar-event');
      select('#calendar').appendChild(calDiv);
     //  console.log(data.items[data.items.length-1]);
      //console.log(data.items[data.items.length-1].start.dateTime.substring(0, 10));
    })
  })