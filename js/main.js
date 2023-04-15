const api_base_url =
  "https://irene.informatik.htw-dresden.de:8888/api/quizzes/";

var selection_pending = true;

// utility for checking a radio button option
function check(event) {
  const elem = event.target;
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

function populate_options() {
  const json = {
    "options": [
      "first option",
      "second option",
      "third option",
      "fourth option"
    ]
  };

  const optionsElem = document.getElementById("options");

  const options = json.options;
  for (var i = 0; i < options.length; i++) {
    create_option(optionsElem, i, options[i]);
  }
}

function create_option(elem, index, content) {
  const fragment = document.createDocumentFragment();

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "option");
  li.setAttribute("onclick", "check(event)");

  const option_id = "option-" + index;
  const input = li.appendChild(document.createElement("input"));
  input.setAttribute("id", option_id);
  input.setAttribute("type", "radio");
  input.setAttribute("name", "question");
  input.setAttribute("value", index);

  const label = li.appendChild(document.createElement("label"));
  label.setAttribute("for", option_id);
  label.textContent = content; 
  
  const submitElem = document.getElementById("submit-button-label");

  elem.insertBefore(fragment, submitElem);
} 

// get a question from the web-quizzes api
async function get_question() {
  const response = await fetch(
    api_base_url + "2",
    {
      method: "GET",
      credentials: "include",
    },
  );
  return await response.json();
}

// solve a question from the web-quizzes api
async function solve_question(solution) {
  const response = await fetch(
    api_base_url + "2/solve",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solution),
    },
  );
  return await response.json();
}

// get all quiz questions that have been completed so far
async function completed_questions() {
  const response = await fetch(
    api_base_url + "completed",
    {
      method: "GET",
      credentials: "include",
    },
  );
  return await response.json();
}

document.addEventListener("DOMContentLoaded", function() {
  populate_options();
}, false);
