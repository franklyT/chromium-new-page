chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
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
        console.log(data);
      })
    })


    chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
        console.log(token)  
   });
      console.log('x')