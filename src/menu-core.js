document.body.addEventListener("click", function() {
  if (
    event.target !== select("#settingsIcon") &&
    !select("#settingsParentNode").contains(event.target) &&
    !select("#settings").classList.contains("hidden")
  ) {
    toggleSpin();
    select(".settings").style.pointerEvents = "none";
    setTimeout(function() {
      select(".settings").style.pointerEvents = "";
    }, 1000);

    select("#settings").classList.add("hidden");
  }
});

select("#settingsIcon").addEventListener("click", function() {
  event.target.style.pointerEvents = "none";
  toggleSpin();

  select(".settings-menu").classList.toggle("hidden");
  setTimeout(function() {
    select(".settings").style.pointerEvents = "";
  }, 1000);
});

function toggleSpin() {
  if (select("#settings").classList.contains("hidden")) {
    select(".settings").classList.remove("fSpin");
    select(".settings").classList.add("rSpin");
  } else {
    select(".settings").classList.add("fSpin");
    select(".settings").classList.remove("rSpin");
  }
}
