var newOptions = 0;
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const OPTIONS_LABEL = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

function correctAmountOfOptions(options) {
  return MIN_OPTIONS <= options && options <= MAX_OPTIONS;
}

function correctAnswerSelected() {
  const radioButtonElems = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < radioButtonElems.length; i++) {
    if (radioButtonElems[i].checked) {
      return true;
    }
  }
  return false;
}

function validate() {
  const submit_button = document.getElementById("submit-button-label");
  const submit_button_classes = submit_button.classList;
  if (correctAmountOfOptions(newOptions) && correctAnswerSelected()) {
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

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "new-option");

  const optionID = "option-" + newOptions;
  li.setAttribute("id", optionID);

  const a = li.appendChild(document.createElement("a"));
  a.setAttribute("class", "new-option-link");

  const label = a.appendChild(document.createElement("label"));
  label.textContent = "Option " + OPTIONS_LABEL[newOptions] + ":";

  const textInput = a.appendChild(document.createElement("input"));
  textInput.setAttribute("type", "text");
  textInput.setAttribute("name", optionID);

  const radioButton = a.appendChild(document.createElement("input"));
  radioButton.setAttribute("type", "radio");
  radioButton.setAttribute("name", "answer");
  radioButton.setAttribute("value", newOptions);
  radioButton.setAttribute("id", optionID);
  radioButton.setAttribute("onclick", "validate()");

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
  const newOptionElems = document.getElementsByClassName("new-option-link");
  for (var i = 0; i < newOptionElems.length; i++) {
    const newOptionElem = newOptionElems[i];
    const newOptionLabel = newOptionElem.querySelector("label");
    newOptionLabel.textContent = "Option " + OPTIONS_LABEL[i];
    const newOptionRadioButton = newOptionElem.querySelector(
      'input[type="radio"]',
    );
    newOptionRadioButton.setAttribute("value", i);
  }
  validate();
}

function create_quiz_question() {
  const questionFormElem = document.getElementById("question-form");
  const formData = new FormData(questionFormElem);
  console.log(formData);
}
