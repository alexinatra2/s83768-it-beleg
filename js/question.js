let env;
const envPath = "./env.json";

async function loadEnv() {
  env = await fetch(envPath).then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
}

function populateOptions(data) {
  const optionsElem = document.getElementById("options");

  const options = data.options;
  Object.keys(options).forEach((i) => {
    createOption(optionsElem, i, options[i]);
  })
}

function createOption(elem, index, content) {
  const li = document.createElement("li");
  li.setAttribute("class", "option");
  li.setAttribute("onclick", "check(event)");

  const optionID = "option-" + index;

  li.innerHTML = `
    <input id=${optionID} type="radio" name="question" value=${index} />
    <label for=${optionID}>${content}</label>
  `;

  const submitElem = document.querySelector(".pending,.ready");

  elem.insertBefore(li, submitElem);
}

function baseHeaders() {
  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(env.USER + ":" + env.PASSWORD));
  return headers;
}

// get a question from the web-quizzes api
async function getQuiz(quizID) {
  const response = await fetch(
    env.API_BASE_URL + quizID,
    {
      method: "GET",
      headers: baseHeaders()
    },
  );
  return await response.json();
}

// solve a question from the web-quizzes api
async function solveQuiz (quizID, solution) {
  const url = env.API_BASE_URL + quizID + "/solve";
  const headers = baseHeaders();
  headers.set("Content-Type", "application/json");
  const response = await fetch(url,
    {
      method: "POST",
      headers: headers,
      body: solution
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
    new FormData(formElem);
  });
  formElem.addEventListener("formdata", async function (e) {
    const data = e.formData;
    let jsonData = {};
    for (const pair of data.entries()) {
      jsonData[pair[0]] = pair[1];
    }
    const response = await solveQuiz(2, "[" + jsonData["question"] + "]");
    console.log(response);
  });
}, false);
