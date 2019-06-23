document.body.addEventListener("click", function() {
  if (
    event.target !== document.querySelector("#settingsIcon") &&
    !document.querySelector("#settingsParentNode").contains(event.target)
  ) {
    if (!document.querySelector("#settings").classList.contains("hidden")) {
      document.querySelector("#settings").classList.add("hidden");
    }
  }
});

document.querySelector("#settingsIcon").addEventListener("click", function() {
  event.target.style.pointerEvents = "none";
  event.target.classList.toggle("active");
  document.querySelector(".settings-menu").classList.toggle("hidden");
  setTimeout(function() {
    document.querySelector(".settings").classList.toggle("active");
    document.querySelector(".settings").style.pointerEvents = "";
  }, 1000);
});
