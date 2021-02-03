var mapOpen = document.querySelector(".map");
var mapPopup = document.querySelector(".map-show");
var mapClose = mapPopup.querySelector(".close");

mapOpen.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.add("content-show");
});

mapClose.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.remove("content-show");
});

 window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (mapPopup.classList.contains("content-show")) {
      mapPopup.classList.remove("content-show");
    }
  }
});

var link = document.querySelector(".btn-js");
var popup = document.querySelector(".write-us");
var close = popup.querySelector(".close");
var myname = document.querySelector("[name=name]");

link.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.add("content-show");
  myname.focus();
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("content-show");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup.classList.contains("content-show")) {
      popup.classList.remove("content-show");
    }
  }
});
