function gSearch() {
    window.location.href =`http://www.google.com/search?q=${document.querySelector('.search').value}`   ;
}

document.querySelector(".submit").addEventListener("click", function(){
    gSearch();
});
  
document.querySelector(".search").addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 13) {
        gSearch();
    }
  });
  
 /* function ready() {
  document.querySelector(".search").focus();
};
*/

function callBackground() {
    document.querySelector('.bg').style.backgroundImage = `url('https://traina.me/images/bg${Math.floor(Math.random()*37)+1}.jpg')`;
}

callBackground();

function getBgUrl(el) {
    var bg = "";
    bg = el.style.backgroundImage
    console.log(bg)
    return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

var image = document.createElement('img');
image.src = getBgUrl(document.querySelector('.bg'));
image.onload = function () {
    document.querySelector('.bg').style.display = 'inline-flex';
};
