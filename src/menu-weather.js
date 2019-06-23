chrome.storage.sync.get("weather", function(items) {
  if (items.weather === undefined || items.weather === null) {
  } else {
    if (items.weather === "show") {
      document.querySelector("#weatherCheckbox").checked = true;
      document.querySelector(".weather-setting-icon").classList.add("active");
      document.querySelector("#weatherIcons").classList.remove("display-none");
      document.querySelector("#weather").classList.remove("display-none");
    } else {
      document.querySelector("#weatherCheckbox").checked = false;
      document
        .querySelector(".weather-setting-icon")
        .classList.remove("active");
      document.querySelector("#weatherIcons").classList.add("display-none");
      document.querySelector("#weather").classList.add("display-none");
    }
  }
});

document.querySelector(".slider").addEventListener("click", function() {
  if (document.querySelector("#weatherCheckbox").checked) {
    chrome.storage.sync.set({ weather: "hide" }, function() {});
  } else {
    chrome.storage.sync.set({ weather: "show" }, function() {});
  }
  document.querySelector(".weather-setting-icon").classList.toggle("active");
  document.querySelector("#weatherIcons").classList.toggle("display-none");
  document.querySelector("#weather").classList.toggle("display-none");
});
