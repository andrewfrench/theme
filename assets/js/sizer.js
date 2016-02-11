(function() {
  sizeBoxes();
  placeTitles();
})();

function sizeBoxes() {
  var realWidth = document.body.clientWidth - 8;
  var boxes = document.getElementsByClassName('box');

  document.getElementById('container').style.width = realWidth + "px";

  for(var i = 0; i < boxes.length; i++) {

    var classes = boxes[i].className.split(' ');
    var longDimension = (realWidth / 2) - 8;
    var shortDimension = (realWidth / 4) - 8;

    if(classes.indexOf('big') != -1) {
      boxes[i].style.width = longDimension + "px";
      boxes[i].style.height = longDimension + "px";
    } else if(classes.indexOf('medium') != -1) {
      boxes[i].style.width = longDimension + "px";
      boxes[i].style.height = shortDimension + "px";
    } else if(classes.indexOf('little') != -1) {
      boxes[i].style.width = shortDimension + "px";
      boxes[i].style.height = shortDimension + "px";
    }
  }
}

function placeTitles() {
  var titles = document.getElementsByClassName("title");
  for(var i = 0; i < titles.length; i++) {
    var title_height = titles[i].offsetHeight + "px";
    titles[i].style.bottom = title_height;
  }
}

window.onresize = function(event) {
  sizeBoxes();
  placeTitles();
}
