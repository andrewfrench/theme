(function() {
  var boxes = document.getElementsByClassName("box");
  var index = 0;
  var box_interval = setInterval(function() {
    if(index == boxes.length) {
      clearInterval(box_interval);
    } else {
      boxes[index].style.backgroundColor = "rgba(0,0,0," + ((Math.random() / 2) + 0.25) + ")";
    }
    index++;
  }, 30);
})();
