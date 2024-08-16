// @ts-nocheck
const runOnHover = () => {
  var noButton = document.getElementById("no");

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var maxWidth = windowWidth - (noButton?.offsetWidth + 100);
  var maxHeight = windowHeight - (noButton?.offsetHeight + 100);

  var randomWidth = Math.floor(Math.random() * maxWidth);
  var randomHeight = Math.floor(Math.random() * maxHeight);

  noButton.style.left = randomWidth + "px";
  noButton.style.top = randomHeight + "px";
}