// utility for checking a radio button option
function check(event) {
  const elem = event.target;
  if (!elem.classList.contains("option")) {
    throw 'check(event) was called on a non-".option" element.';
  }
  const options = document.getElementsByClassName("option");
  for (var i = 0; i < options.length; i++) {
    const option = options[i];
    option.classList.remove("selected");
  }

  elem.classList.add("selected");
  const inputElem = elem.querySelector("input");
  inputElem.checked = true;

  if (selection_pending) {
    const submit_button = document.getElementById("submit-button-label");
    const submit_button_classes = submit_button.classList;
    submit_button_classes.remove("selection-pending");
    submit_button_classes.add("selection-made");
  }
}
