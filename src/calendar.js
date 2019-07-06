chrome.identity.getAuthToken({ interactive: true }, (token) => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const queryParams = { headers };
  const aArr = [];
  let gDate;

  fetch(`https://www.googleapis.com/calendar/v3/colors?access_token=${token}`, queryParams)
    .then(response => response.json()) // Transform the data into json
    .then((data) => {
      const ISODate = String(new Date().toISOString().slice(0, -14))
        .split('-')
        .join('');
        console.log(data.items)
      try {
        data.items.forEach((elm) => {
          if (
            elm.start.dateTime !== undefined
            && elm.start.dateTime !== ''
            && elm.start.dateTime !== 'udf'
          ) {
            gDate = String(elm.start.dateTime)
              .slice(0, -15)
              .split('-')
              .join('');
          } else if (
            elm.start.date !== undefined
            && elm.start.date !== ''
            && elm.start.date !== 'udf'
          ) {
            gDate = String(elm.start.date)
              .split('-')
              .join('');
          }

          // console.log(gDate);
          // console.log(Number(ISODate));

          if (Number(gDate) > Number(ISODate)) {
            aArr.push(elm);
          }
        });

        aArr.sort();
        // console.log(aArr);

        // const getDate = data.items
        //  .filter(elm => elm.start.dateTime !== 'und' && elm.start.dateTime !== undefined)
        //  .filter(
        //   elm => String(elm.start.dateTime).slice(0, -6)
        //     > String(new Date().toISOString()).slice(0, -5),
        //  );
        // .reduce((a, b) => (String(a.start.dateTime).slice(0, -6) < String(b.start.dateTime).slice(0, -6) ? a : b));

        // console.log(aArr);
        const getDate = aArr[0];
        // console.log(getDate);
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
      } catch (e) {
        console.log(e);
      }
    })
    .finally({});
});
