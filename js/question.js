let env;

async function loadEnv(envPath) {
  env = await fetch(envPath).then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
  return env;
}

class Question {
  constructor() {
    this.headers = new Headers();
    this.headers.set(
      "Authorization",
      "Basic " + btoa(env.USER + ":" + env.PASSWORD),
    );
  }

  setID(questionID) {
    this.questionID = questionID;
  }

  clear() {
    const optionsElem = document.getElementById("options");
    optionsElem.innerHTML = "";
  }

  render() {
    const questionElem = document.getElementById("question");
    questionElem.textContent = this.data.text;
    const optionsElem = document.getElementById("options");
    const options = this.data.options;
    Object.keys(options).forEach((i) => {
      const li = document.createElement("li");
      li.setAttribute("class", "option");
      li.setAttribute("onclick", "check(event)");

      const optionID = "option-" + i;

      li.innerHTML = `
    <input id=${optionID} type="radio" name="solution" value=${i} />
    <label for=${optionID}>${options[i]}</label>
  `;
      optionsElem.appendChild(li);
    });
  }

  // get a question from the web-quizzes api
  async fetch() {
    const response = await fetch(
      env.API_BASE_URL + this.questionID,
      {
        method: "GET",
        headers: this.headers,
      },
    );
    this.data = await response.json();
  }

  // solve a question from the web-quizzes api
  async solve(solution) {
    const url = env.API_BASE_URL + this.questionID + "/solve";
    const headers = this.headers;
    headers.set("Content-Type", "application/json");
    const formattedSolution = `[${solution}]`;
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formattedSolution,
    });
    return await response.json();
  }

  // get all quiz questions that have been completed so far
  async getCompleted() {
    const response = await fetch(
      env.API_BASE_URL + "completed",
      {
        method: "GET",
        headers: this.headers,
      },
    );
    return await response.json();
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await loadEnv("./env.json");
  const question = new Question();
  question.setID(4);
  await question.fetch();
  question.render();
  const formElem = document.getElementById("question-solve-form");
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(formElem);
  });
  formElem.addEventListener("formdata", async function (e) {
    const data = e.formData;
    const response = await question.solve(data.get("solution"));
    console.log(response);
    question.clear();
  });
}, false);
