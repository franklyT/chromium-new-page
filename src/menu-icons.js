selectAll(".bg-picker").forEach(elm => {
  elm.addEventListener("click", function() {
    select(".bg").display = "none";

    selectAll(".bg-picker").forEach(nestedElm => {
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
    } else if (event.target.id === "vanilla") {
      chrome.storage.sync.set({ allData: vanillaBg, bgID: "vanilla" }, function() {
        imageBay = vanillaBg;
        imageBay.bg = myBg();
        callBackground();
        catchFourZeroFour(imageBay.bg);
      });
    }
  });
});

chrome.storage.sync.get("bgID", function(items) {
  select("#" + items.bgID).classList.add("active");
});
