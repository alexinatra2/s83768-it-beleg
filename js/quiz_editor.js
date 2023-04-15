var newOptions = 0;

// create an empty option element in the DOM
function add_empty_option() {
  const fragment = document.createDocumentFragment();

  const newOptionsElems = document.getElementsByClassName("new-option");
  const optionID = "option-" + newOptionsElems.length;

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "new-option");
  li.setAttribute("id", optionID);

  const deleteIcon = li.appendChild(document.createElement("i"));
  deleteIcon.setAttribute("class", "fa-solid fa-trash");
  deleteIcon.setAttribute("onclick", "delete_option(event)");
  
  const input = li.appendChild(document.createElement("input"));
  input.setAttribute("type", "text");

  const label = li.appendChild(document.createElement("label"));
  label.textContent = "";

  const addButtonElem = document.getElementById("add-button");

  const optionsElem = document.getElementById("options");
  optionsElem.insertBefore(fragment, addButtonElem);

  newOptions = newOptions + 1;
}

function delete_option(event) {
  const elem = event.target;
  const parent = elem.parentNode;
  const children = parent.children;
  for (var i = 0; i < children.length; i++) {
    const child = children[i];
    child.remove();
  }
  parent.remove();
  newOptions = newOptions - 1;
}

function create_quiz_question() {
}
