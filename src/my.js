function gSearch() {
    window.open(`http://www.google.com/search?q=${document.querySelector('.search').value}`, '_blank');
}

document.querySelector(".submit").addEventListener("click", function(){
    gSearch();
});
  