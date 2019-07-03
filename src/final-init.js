// Disable this for debugging
// cClear(1500);

onDOMLoad(pageTimeout());

function pageTimeout() {
  setTimeout(() => {
    window.stop();
  }, 3000);
}
