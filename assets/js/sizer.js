(function() {
  sizeBoxes(function() {
    uncover()
  });
})();

function sizeBoxes(next) {
  if(document.body.clientWidth > 605) {
    var realWidth = document.body.clientWidth - 8;
    var boxes = document.getElementsByClassName('box');

    if(boxes) {
      // Set container width, max 1200px
      if(realWidth < 1200) {
        document.getElementById('inner-container').style.width = realWidth + "px";
      } else {
        realWidth = 1200;
        document.getElementById('inner-container').style.width = realWidth + "px";
      }

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
        } else if(classes.indexOf('huge') != -1) {
          boxes[i].style.width = (realWidth - 8) + "px";
          boxes[i].style.height = (shortDimension * 1.5) + "px";
        }
      }
    }
  } else {
    var realWidth = document.body.clientWidth - 8;
    var boxes = document.getElementsByClassName('box');

    document.getElementById('inner-container').style.width = realWidth + "px";

    if(boxes) {
      for(var i = 0; i < boxes.length; i++) {
        boxes[i].style.width = "auto";
        boxes[i].style.height =  "200px";
        }
      }
    }

  next();
}


function uncover() {
  document.getElementById("outer-container").style.visibility = "visible";
}

window.onresize = function(event) {
  sizeBoxes(function() {});
}
