select("#historyEraser").addEventListener("click", () => {
  let cQuery = confirm(
    "Are you sure you want to erase your history?\nNote: This will erase your browser's entire history permanently."
  );
  if (cQuery) {
    chrome.history.deleteAll(() => {
      console.log(
        "Tabby Tab: WARNING: Your web history has been erased. If this is not expected behavior, discontinue Tabby Tab extension use."
      );
    });
    select('#historyEraser').classList.add('rSpin')
    setTimeout(()=> {
        select('#historyEraser').classList.remove('rSpin')
    }, 1000)
    selectAll(".topsites-box").forEach(elm => {
      elm.parentNode.removeChild(elm);
    });
  }
});
