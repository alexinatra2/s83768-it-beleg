function check(event) {
  var elem = event.target;
  var optionsElem = document.getElementById("options");
  var options = optionsElem.children;
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    option.classList.remove("selected");
  }
  elem.classList.add("selected");
  var inputElem = elem.querySelector("input");
  inputElem.checked = true;
}
