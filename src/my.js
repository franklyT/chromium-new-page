function gSearch() {
    window.open(`http://www.google.com/search?q=${document.querySelector('.search').value}`, '_blank');
}

document.querySelector(".submit").addEventListener("click", function(){
    gSearch();
});
  
document.querySelector(".search").addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        gSearch();
    }
  });
  