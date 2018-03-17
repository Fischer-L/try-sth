
var p = document.querySelector("#p");
var inp = document.querySelector("input");
var btn = document.querySelector("button");
btn.addEventListener("mouseup", function () {
  p.innerHTML = "mouseup: Focus input after 3 secs";
  setTimeout(function () {
    p.innerHTML = "mouseup: Focused input";
    inp.focus();
  }, 3000);
});
btn.addEventListener("touchend", function () {
  p.innerHTML = "touchend: Focus input after 3 secs";
  setTimeout(function () {
    p.innerHTML = "touchend: Focused input";
    inp.focus();
  }, 3000);
});
document.body.addEventListener("touchstart", function () {
  p.innerHTML = "document.body touchstart";
});
document.addEventListener("touchend", function () {
  p.innerHTML = "document touchend: Focus input after 3 secs";
  setTimeout(function () {
    p.innerHTML = "document touchend: Focused input";
    inp.focus();
  }, 3000);
});
p.innerHTML = "Loaded";
