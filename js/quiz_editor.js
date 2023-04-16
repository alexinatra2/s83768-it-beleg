var idCounter = 0;
var newOptions = 0;
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const OPTIONS_LABEL = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

function validate() {
  const submit_button = document.getElementById("submit-button-label");
  const submit_button_classes = submit_button.classList;
  if (MIN_OPTIONS <= newOptions && newOptions <= MAX_OPTIONS) {
    submit_button_classes.remove("pending");
    submit_button_classes.add("ready");
  } else {
    submit_button_classes.remove("ready");
    submit_button_classes.add("pending");
  }
}

// create an empty option element in the DOM
function add_empty_option() {
  if (newOptions >= MAX_OPTIONS) {
    throw "attempted to create more than " + MAX_OPTIONS + " options";
  }

  const fragment = document.createDocumentFragment();

  const optionID = "option-" + idCounter;
  idCounter++;

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "new-option");
  li.setAttribute("id", optionID);

  const a = li.appendChild(document.createElement("a"));
  a.setAttribute("class", "new-option-link");

  const label = a.appendChild(document.createElement("label"));
  label.textContent = "Option " + OPTIONS_LABEL[newOptions] + ":";

  const input = a.appendChild(document.createElement("input"));
  input.setAttribute("type", "text");

  const deleteIcon = a.appendChild(document.createElement("i"));
  deleteIcon.setAttribute("class", "fa-solid fa-trash modifier");
  deleteIcon.setAttribute("onclick", "delete_option(event)");

  const addButtonElem = document.getElementById("add-button");

  const optionsElem = document.getElementById("options");
  optionsElem.insertBefore(fragment, addButtonElem);
  newOptions++;
  validate();
}

function delete_option(event) {
  const elem = event.target;
  const toDelete = elem.parentNode.parentNode;
  toDelete.innerHTML = "";
  toDelete.remove();
  newOptions--;
  validate();
}

function create_quiz_question() {
}
