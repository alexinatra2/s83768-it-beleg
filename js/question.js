var env;

async function loadEnv() {
  env = await fetch("./.env.json").then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
}

function populateOptions(data) {
  const optionsElem = document.getElementById("options");

  const options = data.options;
  for (var i = 0; i < options.length; i++) {
    createOption(optionsElem, i, options[i]);
  }
}

function createOption(elem, index, content) {
  const fragment = document.createDocumentFragment();

  const li = fragment.appendChild(document.createElement("li"));
  li.setAttribute("class", "option");
  li.setAttribute("onclick", "check(event)");

  const optionID = "option-" + index;
  const input = li.appendChild(document.createElement("input"));
  input.setAttribute("id", optionID);
  input.setAttribute("type", "radio");
  input.setAttribute("name", "question");
  input.setAttribute("value", index);

  const label = li.appendChild(document.createElement("label"));
  label.setAttribute("for", optionID);
  label.textContent = content;

  const submitElem = document.querySelector(".pending,.ready");

  elem.insertBefore(fragment, submitElem);
}

// get a question from the web-quizzes api
async function getQuiz() {
  const response = await fetch(
    env.API_BASE_URL + "2",
    {
      method: "GET",
      credentials: "include",
    },
  );
  return await response.json();
}

// solve a question from the web-quizzes api
async function solveQuiz(solution) {
  const response = await fetch(
    env.API_BASE_URL + "2/solve",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
      },
      body: JSON.stringify(solution),
    },
  );
  return await response.json();
}

// get all quiz questions that have been completed so far
async function completedQuizzes() {
  const response = await fetch(
    env.API_BASE_URL + "completed",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "no-cors",
      },
    },
  );
  return await response.json();
}

async function findAvailableQuizIds() {}

document.addEventListener("DOMContentLoaded", async function () {
  await loadEnv();
  populateOptions(env.test_data);
  const formElem = document.getElementById("question-solve-form");
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData();
  });
  formElem.addEventListener("formdata", (e) => {
    const data = e.formData;
    return data;
  });
}, false);
