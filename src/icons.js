document.body.addEventListener("click", function() {
  if (event.target !== document.querySelector('#settingsIcon') && !(document.querySelector('#settingsParentNode').contains(event.target))) {

  if ( !(document.querySelector('#settings').classList.contains('hidden')) ) {
    document.querySelector('#settings').classList.add('hidden');
  }
}
});

document.querySelectorAll(".bg-picker").forEach(elm => {
  elm.addEventListener("click", function() {
    document.querySelector('.bg').display = 'none';

    document.querySelectorAll(".bg-picker").forEach(nestedElm => {
      nestedElm.classList.remove("active");
    });
    event.target.classList.add("active");

    if (event.target.id === "tabby") {
      chrome.storage.sync.set({ allData: tabbyBg, bgID: "tabby" }, function() {
        imageBay = tabbyBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    } else if (event.target.id === "cow") {
      chrome.storage.sync.set({ allData: cowBg, bgID: "cow" }, function() {
        imageBay = cowBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    }
  });
});

chrome.storage.sync.get("bgID", function(items) {
  document.querySelector("#" + items.bgID).classList.add("active");
});
