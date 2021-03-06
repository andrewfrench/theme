function Map() {}

var mapStyles = [
  {
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "color": "#eeeeee" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "color": "#222222" }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

Map.prototype.isGeoPage = function() {
  var listContainer = document.getElementById("list-container");
  if(listContainer) {
    listContainerTag = listContainer.dataset.tag;
    return listContainerTag == "atlas";
  } else {
    return false;
  }
}

Map.prototype.getLocations = function() {
  var posts = document.getElementsByClassName("box");

  this.infoWindows = new Array();
  this.markers = new Array();
  this.bounds = new google.maps.LatLngBounds();

  var markerImage = {
    url: "/assets/marker.png",
    size: new google.maps.Size(15, 15),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(8, 8)
  }

  // Strip locations from posts
  for(var i = 0; i < posts.length; i++) {
    var currentPost = posts[i];
    var postData = currentPost.dataset.postTags.split(" ");

    for(var j = 0; j < postData.length; j++) {
      if(postData[j].indexOf("loc:") > -1) {
        var locArr = postData[j].split(":")[1].split("|");

        var lat = parseFloat(locArr[0]);
        var lng = parseFloat(locArr[1]);

        var latlng = new google.maps.LatLng(lat, lng);
        this.bounds.extend(latlng);
        var marker = new google.maps.Marker({
          map: this.googleMap,
          position: latlng,
          icon: markerImage
        });

        this.attachInfoWindow(marker, currentPost.dataset.postTitle, currentPost.dataset.postUrl);
      }
    }
  }

  this.googleMap.fitBounds(this.bounds);
}

Map.prototype.attachInfoWindow = function(marker, title, url) {
  var contentString = "<div class=\"infowindow\"><a href=" + url + ">" + title + "</a></div>";

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  var mapObj = this;
  marker.addListener("click", function() {
    for(var i = 0; i < mapObj.infoWindows.length; i++) {
      mapObj.infoWindows[i].close();
    }

    infoWindow.open(marker.getMap(), marker);
  });

  this.infoWindows.push(infoWindow);
}

Map.prototype.createMap = function() {
  var mapContainer = document.getElementById("map-container");

  var headerHeight = document.getElementById("header").clientHeight;

  document.body.style.overflow = "hidden";
  mapContainer.style.position = "absolute";
  mapContainer.style.width    = "100%";
  mapContainer.style.left     = 0;
  mapContainer.style.top      = headerHeight + "px";
  mapContainer.style.height   = (window.innerHeight - headerHeight) + "px";

  this.googleMap = new google.maps.Map(mapContainer, {
    minZoom: 4,
    center: {lat: 61.1, lng: -149.9},
    disableDefaultUI: true
  });

  this.googleMap.setOptions({styles: mapStyles});
}

Map.prototype.hideList = function() {
  document.getElementById("list-container").style.visibility = "hidden";
}

// Create callback for Google Maps API
function generateMap() {
  var map = new Map();

  if(map.isGeoPage()) {
    map.createMap();
    map.getLocations();
    map.hideList();
  }
}
