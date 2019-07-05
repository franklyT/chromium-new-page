chrome.identity.getAuthToken({ interactive: true }, (token) => {
  /* const init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    contentType: 'json',
  };
*/
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const queryParams = { headers };

  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
    .then(response => response.json()) // Transform the data into json
    .then((data) => {
      // test function
      // data.items.forEach((elm)=> {
      // console.log(String(elm.start.dateTime).slice(0, -6));
      // })

      try {
        const getDate = data.items
          .filter(
            elm => String(elm.start.dateTime).slice(0, -6)
              > String(new Date().toISOString()).slice(0, -5),
          )
          .reduce((a, b) => (String(a.start.dateTime).slice(0, -6) < String(b.start.dateTime).slice(0, -6) ? a : b));

        const calDiv = document.createElement('div');
        calDiv.classList.add('calendar-event');
        calDiv.innerHTML = "<span class='calendar__upcoming'>Upcoming Event</span>";
        calDiv.innerHTML += `<img class="calendar__icon" src="icons/calicon.png"></img><span class='event'>${
          getDate.summary
        }</span><span class='time'>${dateConverter(
          getDate.start.dateTime.substring(0, 10),
        )} • ${timeConverter(getDate.start.dateTime.substring(11, 16))}</span>`;

        if (getDate.location) {
          calDiv.innerHTML += `<span class='description'>•&nbsp;&nbsp${getDate.location}</span>`;
        }
        if (getDate.description) {
          calDiv.innerHTML += `&nbsp;&nbsp; <span class='description'>${getDate.description}</span> `;
        }
        select('.calendar').appendChild(calDiv);
      } catch (e) {}
    })
    .finally({});
});
