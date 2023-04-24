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

  incrementQuestionID() {
    this.setID(this.questionID + 1);
  }

  render() {
    const questionElem = document.getElementById("question");
    questionElem.textContent = this.data.text;
    const options = this.data.options;
    const optionsElem = document.getElementById("options");
    optionsElem.innerHTML = "";
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

document.addEventListener("DOMContentLoaded", async function() {
  const nav = new Navigation();
  nav.addHomeLogo()
    .addNavItem("general")
    .addNavItem("maths")
    .addNavItem("it")
    .addNavItem("music")
    .addNavItem("quizeditor")
    .addThemeButton()
    .create();
  await loadEnv("./env.json");
  const question = new Question();
  question.setID(2);
  await question.fetch();
  question.render();
  const formElem = document.getElementById("question-solve-form");
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(formElem);
  });
  formElem.addEventListener("formdata", async function(e) {
    const response = await question.solve(e.formData.get("solution"));
    console.log(response);
    question.incrementQuestionID();
    await question.fetch();
    question.render();
  });
}, false);
