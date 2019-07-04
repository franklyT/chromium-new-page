/* eslint-disable no-undef */
// Disable this for debugging
// cClear(1500);

// eslint-disable-next-line no-use-before-define
onDOMLoad(pageTimeout());

function pageTimeout() {
  setTimeout(() => {
    window.stop();
  }, 3000);
}
