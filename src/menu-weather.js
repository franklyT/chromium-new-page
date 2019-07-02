chrome.storage.sync.get("weather", function(items) {
  if (items.weather === undefined || items.weather === null) {
  } else {
    if (items.weather === "show") {
      select("#weatherCheckbox").checked = true;
      select(".settings__weather__icon").classList.add("settings__icon--active");
      select("#weather-icons").classList.remove("display-none");
      select("#weather").classList.remove("display-none");
    } else {
      select("#weatherCheckbox").checked = false;
      document
        .querySelector(".settings__weather__icon")
        .classList.remove("settings__icon--active");
      select("#weather-icons").classList.add("display-none");
      select("#weather").classList.add("display-none");
    }
  }
});

select(".slider").addEventListener("click", function() {
  if (select("#weatherCheckbox").checked) {
    chrome.storage.sync.set({ weather: "hide" }, function() {});
  } else {
    chrome.storage.sync.set({ weather: "show" }, function() {});
  }
  select(".settings__weather__icon").classList.toggle("settings__icon--active");
  select("#weather-icons").classList.toggle("display-none");
  select("#weather").classList.toggle("display-none");
});
