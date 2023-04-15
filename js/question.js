var selection_pending = true;
var env;

async function load_env() {
  env = await fetch("./.env.json").then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
}

function populate_options() {
  const json = {
    "options": [
      "first option",
      "second option",
      "third option",
      "fourth option",
    ],
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
    env.API_BASE_URL + "2",
    {
      method: "GET",
      credentials: "include",
      user: "test@gmail.com",
      password: "secret"
      // headers: {
      //   "Access-Control-Allow-Origin": "no-cors"
      // }
    }
  );
  return await response.json();
}

// solve a question from the web-quizzes api
async function solve_question(solution) {
  const response = await fetch(
    env.API_BASE_URL + "2/solve",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "no-cors"
      },
      body: JSON.stringify(solution),
    },
  );
  return await response.json();
}

// get all quiz questions that have been completed so far
async function completed_questions() {
  const response = await fetch(
    env.API_BASE_URL + "completed",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "no-cors"
      }
    },
  );
  return await response.json();
}

document.addEventListener("DOMContentLoaded", function () {
  load_env();
  populate_options();
}, false);
