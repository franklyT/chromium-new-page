document.body.addEventListener("click", function() {
  if (
    event.target !== document.querySelector("#settingsIcon") &&
    !document.querySelector("#settingsParentNode").contains(event.target) &&
    !select('#settings').classList.contains('hidden')
  ) {
    toggleSpin();
    document.querySelector(".settings").style.pointerEvents = "none";
    setTimeout(function() {
        document.querySelector(".settings").style.pointerEvents = "";
      }, 1000);

      document.querySelector("#settings").classList.add("hidden");
  }
});

document.querySelector("#settingsIcon").addEventListener("click", function() {
  event.target.style.pointerEvents = "none";
  toggleSpin();

document.querySelector(".settings-menu").classList.toggle("hidden");
  setTimeout(function() {
    document.querySelector(".settings").style.pointerEvents = "";
  }, 1000);
});



function toggleSpin() {
    if (select('#settings').classList.contains('hidden')) {
    document.querySelector(".settings").classList.remove("fSpin");
    document.querySelector(".settings").classList.add("rSpin");
} else {
    document.querySelector(".settings").classList.add("fSpin");
    document.querySelector(".settings").classList.remove("rSpin");
}
}