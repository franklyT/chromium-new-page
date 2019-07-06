onDOMLoad(pageTimeout());

function pageTimeout() {
  setTimeout(() => {
    window.stop();
  }, 3000);
}
