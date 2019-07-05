// This function filters potential duplicates cropping up in topsites
function parseTopsites() {
  chrome.topSites.get(async (info) => {
    const tempGroup = info;
    tempGroup.forEach((elm1, index1) => {
      tempGroup.forEach((elm2, index2) => {
        if (index1 !== index2) {
          if (
            JSON.stringify(elm1.url.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''))
            === JSON.stringify(elm2.url.match(/[https:|http:]\/\/(.*?)\//)[1].replace(/www./, ''))
          ) {
            tempGroup.splice(index1, 1);
          }
        }
      });
    });

    for (let i = 0; i < 5; i += 1) {
      // https://eslint.org/docs/rules/no-await-in-loop
      giveUsApples(tempGroup[i].url, tempGroup[i].title, 'tsites');
    }
    setTimeout(() => {
      selectAll('.tsites-box').forEach((elm) => {
        const appender = document.createElement('div');
        appender.classList.add('tsites-box__top');
        elm.before(appender);
      });
    }, 1000);
  });
}

onDOMLoad(parseTopsites());
