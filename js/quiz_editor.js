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
function addEmptyOption() {
  if (newOptions >= MAX_OPTIONS) {
    throw "attempted to create more than " + MAX_OPTIONS + " options";
  }

  const fragment = document.createDocumentFragment();

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "new-option");

  const optionNumber = newOptions + 1;
  const optionID = "option-" + optionNumber;
  li.setAttribute("id", optionID);

  const a = li.appendChild(document.createElement("a"));
  a.setAttribute("class", "new-option-link");
  a.setAttribute("onclick", "chooseCorrectOption(event)");

  const radioButton = a.appendChild(document.createElement("input"));
  radioButton.setAttribute("type", "radio");
  radioButton.setAttribute("name", "answer");
  radioButton.setAttribute("value", "[" + optionNumber + "]");
  radioButton.setAttribute("id", optionID);
  radioButton.setAttribute("onclick", "validate()");
  radioButton.setAttribute("class", "new-option-radio");

  const textInput = a.appendChild(document.createElement("input"));
  textInput.setAttribute("type", "text");
  textInput.setAttribute("name", optionID);
  textInput.setAttribute("class", "new-option-text");
  const textHint = "Option " + OPTIONS_LABEL[newOptions];
  addTextHint(textInput, textHint);

  const deleteIcon = a.appendChild(document.createElement("i"));
  deleteIcon.setAttribute("class", "fa-solid fa-trash new-option-delete");
  deleteIcon.setAttribute("onclick", "deleteOption(event)");

  const addButtonElem = document.getElementById("add-button");

  const optionsElem = document.getElementById("options");
  optionsElem.insertBefore(fragment, addButtonElem);
  newOptions++;
  validate();
}

function chooseCorrectOption(event) {
  var elem = event.target;
  if (!elem.classList.contains(".new-option-link")) {
    elem = elem.parentNode;
  }

  const options = document.getElementsByClassName(".new-option-link");
  for (var i = 0; i < options.length; i++) {
    const option = options[i];
    option.classList.remove("selected");
  }

  elem.classList.add("selected");
  const radioElem = elem.querySelector(".new-option-radio");
  radioElem.checked = true;

  const submitButtonElem = document.querySelector(".ready,.pending");
  const submitButtonElemClasses = submitButtonElem.classList;
  submitButtonElemClasses.remove("pending");
  submitButtonElemClasses.add("ready");
}

function addTextHint(elem, hintText) {
  if (elem.value == "") {
    elem.value = hintText;
  }

  elem.onfocus = function () {
    if (elem.value == hintText) {
      elem.value = "";
    }
  };

  elem.onblur = function () {
    if (elem.value == "") {
      elem.value = hintText;
    }
  };
}

function deleteOption(event) {
  const elem = event.target;
  const toDelete = elem.parentNode.parentNode;
  toDelete.innerHTML = "";
  toDelete.remove();
  newOptions--;
  validate();
}

document.addEventListener("DOMContentLoaded", async function () {
  const formElem = document.getElementById("question-edit-form");

  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(formElem);
  });

  formElem.addEventListener("formdata", (e) => {
    const data = e.formData;
    var questionData = {
      "options": [],
    };
    for (const pair of data.entries()) {
      const key = pair[0];
      const value = pair[1];
      if (key.indexOf("option") > -1) {
        questionData.options.push(value);
      } else {
        questionData[key] = value;
      }
    }
    const jsonData = JSON.stringify(questionData);
    console.log(jsonData);
  });

  const questionTitleElem = document.getElementById("question-title");
  addTextHint(questionTitleElem, "Question Title");

  const questionElem = document.getElementById("question");
  addTextHint(questionElem, "Question");
}, false);
