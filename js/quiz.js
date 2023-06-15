class Quiz {
  data;

  constructor() {
    this.headers = new Headers();
    this.headers.set("Authorization", "Basic " + btoa(env.USER + ":" + env.PASSWORD));
  }

  setQuestionID(questionID) {
    this.questionID = questionID;
  }

  incrementQuestionID() {
    this.setQuestionID(this.questionID + 1);
  }

  renderOptions() {
    const questionElem = document.getElementById("question");
    questionElem.textContent = this.data.text;
    const options = this.data.options;
    const optionsElem = document.getElementById("options");
    optionsElem.querySelectorAll(".option").forEach((option) =>
      optionsElem.removeChild(option)
    );
    const submitButtonTileElem = document.getElementById("submit-button-tile");
    submitButtonTileElem.classList.remove("ready");
    submitButtonTileElem.classList.add("pending");
    Object.keys(options).forEach((i) => {
      const li = document.createElement("li");
      li.setAttribute("class", "option tile");
      li.setAttribute("onclick", "check(event)");

      const optionID = "option-" + i;

      li.innerHTML = `
        <input id=${optionID} type="radio" name="solution" value=${i} />
        <label for=${optionID}>${options[i]}</label>
      `;
      optionsElem.insertBefore(li, submitButtonTileElem);
    });
  }

  async highlightCorrect() {
    const correctID = await this.getCorrect();
    const correctOptionElem = document.getElementById("option-" + correctID);
    correctOptionElem.parentNode.classList.add("correct");
  }

  // get a question from the web-quizzes api
  async fetchQuestion() {
    const response = await fetch(
      env.API_BASE_URL + this.questionID,
      {
        method: "GET",
        headers: this.headers,
      },
    );
    this.data = await response.json();
    return this.data;
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
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }

  // obtain the correct answer by brute-forcing all choices
  async getCorrect() {
    const options = this.data.options;
    for (const solutionIndex of options.keys()) {
      const response = await this.solve(solutionIndex);
      if (response.success) {
        return solutionIndex;
      }
    }
    throw "No correct option exists";
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
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  const nav = new Navigation();
  nav.addHomeLogo()
    .addNavItem("general")
    .addNavItem("maths")
    .addNavItem("it")
    .addNavItem("music")
    .addThemeButton()
    .create();

  await loadEnv("./env.json");
  const quiz = new Quiz();
  quiz.setQuestionID(2);
  await quiz.fetchQuestion();
  quiz.renderOptions();

  const formElem = document.getElementById("question-solve-form");

  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(formElem);
  });

  formElem.addEventListener("formdata", async function(e) {
    const pickedOption = e.formData.get("solution");
    await quiz.solve(pickedOption);
    await quiz.highlightCorrect();
    await ((ms) => new Promise((r) => setTimeout(r, ms)))(1000);
    quiz.incrementQuestionID();
    await quiz.fetchQuestion();
    quiz.renderOptions();
  });
}, false);
