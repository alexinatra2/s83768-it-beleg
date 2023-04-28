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
  const submitButton = document.getElementById("submit-button");
  const submitButtonClasses = submitButton.classList;
  if (correctAmountOfOptions(newOptions) && correctAnswerSelected()) {
    submitButtonClasses.remove("pending");
    submitButtonClasses.add("ready");
  } else {
    submitButtonClasses.remove("ready");
    submitButtonClasses.add("pending");
  }
}

// create an empty option element in the DOM
function addEmptyOption() {
  if (newOptions >= MAX_OPTIONS) {
    throw `attempted to create more than ${MAX_OPTIONS} options`;
  }

  const optionNumber = newOptions + 1;
  const optionID = "option-" + optionNumber;
  const li = document.createElement("li"); 
  li.setAttribute("class", "new-option");
  li.setAttribute("id", optionID);

  li.innerHTML = `
    <a class="new-option-link" onclick="chooseCorrectOption(event)">
      <input type="radio" name="answer" value="[${optionNumber}]" id="${optionID}" onclick=validate() class="new-option-radio" />
      <input type="text" name="${optionID}" class="new-option-text" />
      <i class="fa-solid fa-trash new-option-delete" onclick="deleteOption(event)"></i>
    </a>
  `;

  const textInput = li.querySelector('input[type="text"]');
  const textHint = "Option " + OPTIONS_LABEL[newOptions];
  addTextHint(textInput, textHint);

  const addButtonElem = document.getElementById("add-button-tile");

  const optionsElem = document.getElementById("options");
  optionsElem.insertBefore(li, addButtonElem);
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
  const nav = new Navigation();
  nav.addHomeLogo()
    .addNavItem("general")
    .addNavItem("maths")
    .addNavItem("it")
    .addNavItem("music")
    .addNavItem("quizeditor")
    .addThemeButton()
    .create();

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
    jsonData["title"] = "title";
    console.log(jsonData);
  });

  const questionElem = document.getElementById("question");
  addTextHint(questionElem, "Question");
}, false);
