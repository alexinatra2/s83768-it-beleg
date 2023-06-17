/**
 * @author Alexander Holzknecht
 *
 * A class holding the state of the current quiz session
 */
class Quiz {
  /**
   * The question catalogue of all locally available questions
   */
  questionCatalogue;
  env;
  selectedCategory;
  currentQuestion;
  /**
   * The questionID field is used to fetch the API data from the server.
   * It holds the ID required by the path parameter for the quiz API
   */
  questionID;

  /**
   * constructor for the Quiz class
   *
   * @param env the environment variables that should be specified in "./env.json"
   * @param questionCatalogue a json formatted version of the question catalogue
   */
  constructor(env, questionCatalogue) {
    this.env = env;
    this.headers = new Headers();
    this.headers.set("Authorization", "Basic " + btoa(this.env.USER + ":" + this.env.PASSWORD));
    this.questionCatalogue = questionCatalogue;
    this.selectedCategory = getCategory();

    let temp;
    this.questionID = localStorage.getItem("questionID") ||
        (temp = 2, localStorage.setItem("questionID", temp), temp);
  }

  /**
   * Loads either the next question from the online questions or a random
   * one from the current category, dependent on the "selectedCategory" field
   *
   * @returns {Promise<void>} an empty promise :'(
   */
  async loadQuestion() {
    if (this.selectedCategory === "people") {
      this.currentQuestion = await fetch(this.env.API_BASE_URL + this.questionID,
          {
            method: "GET",
            headers: this.headers
          })
          .then((response) => response.json())
          .then(async (json) => {
            let question = new Question(json.text, json.options);
            const correct = await this.getCorrect();
            question.setCorrect(correct);
            return question;
          })
    } else {
      this.currentQuestion = this.questionCatalogue.questionSets
          .find((qs) => qs.title === this.selectedCategory)
          .getRandom();
    }
  }

  /**
   * Method responsible for rendering all state of the quiz to the DOM.
   * The category "maths" gets special treatment as it has to be rendered
   * by the katex engine
   */
  render() {
    const questionElem = document.getElementById("question");
    questionElem.textContent = this.currentQuestion.question;
    const options = this.currentQuestion.options;
    const optionsElem = document.getElementById("options");
    optionsElem.querySelectorAll(".option").forEach((option) =>
      optionsElem.removeChild(option)
    );
    const submitButtonTileElem = document.getElementById("submit-button-tile");
    submitButtonTileElem.classList.remove("ready");
    submitButtonTileElem.classList.add("pending");

    let liElems = [];
    Object.keys(options).forEach((i) => {
      const li = document.createElement("li");
      li.setAttribute("class", "option tile");
      li.setAttribute("onclick", "check(event)");

      const optionID = "option-" + i;

      li.innerHTML = `
        <input id=${optionID} type="radio" name="solution" value=${i} />
        <label for=${optionID}>${options[i]}</label>
      `;
      liElems.push(li);
    });
    const shuffledLiElems = getShuffledArr(liElems);
    shuffledLiElems.forEach((li) => {
      optionsElem.insertBefore(li, submitButtonTileElem);
      if (this.selectedCategory === "maths") {
        const labelElem = li.querySelector("label");
        const content = labelElem.textContent;
        labelElem.textContent = "";
        const katexSpan = document.createElement("span");
        li.querySelector("label").appendChild(katexSpan);
        katex.render(content, katexSpan, {thrownOnError: false,});
      }
    });
    if (this.selectedCategory === "maths") {
      katex.render(questionElem.textContent, questionElem, {thrownOnError: false,});
    }
    let headingElem = document.querySelector("h1");
    headingElem.textContent = TOPIC_DATA[this.selectedCategory].label;
  }

  /**
   * Adds the "correct" class to the correct option of the current question
   *
   * @returns {Promise<void>} the correct option index
   */
  async highlightCorrect() {
    const correctOptionElem = document.getElementById("option-" + this.currentQuestion.correct);
    correctOptionElem.parentNode.classList.add("correct");
    return this.currentQuestion.correct;
  }

  /**
   *   solve a question from the web-quizzes api
   */
  async solve(solution) {
    if (this.selectedCategory === "people") {
      const url = this.env.API_BASE_URL + this.questionID + "/solve";
      const headers = this.headers;
      headers.set("Content-Type", "application/json");
      const formattedSolution = `[${solution}]`;
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formattedSolution,
      });
      const responseJSON = await response.json();
      return responseJSON.success;
    } else {
      return this.currentQuestion.isCorrect(solution);
    }
  }

  /**
   *   obtain the correct answer by brute-forcing all choices
   */
  async getCorrect() {
    for (let solutionIndex = 0; solutionIndex < 4; solutionIndex++) {
      const isCorrect = await this.solve(solutionIndex);
      if (isCorrect) {
        return solutionIndex;
      }
    }
    throw "No correct option exists";
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  const nav = new Navigation();
  nav.addHomeLogo()
    .addNavItem("general")
    .addNavItem("maths")
    .addNavItem("it")
    .addNavItem("music")
    .addNavItem("people")
    .addThemeButton()
    .create();

  const env = await loadEnv("./env.json");
  const qc = await fetch("./resources/questionCatalogue.json").then((res) => res.json());
  const catalogue = new QuestionCatalogue(qc);
  const quiz = new Quiz(env, catalogue);
  await quiz.loadQuestion();
  quiz.render();

  const formElem = document.getElementById("question-solve-form");

  /**
   * prevent the default behaviour of the submit button and instead delegate to the "formadata" event
   * that gets fired by the creation of a "FormData" object
   */
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(formElem);
  });

  /**
   * handle the routine of finding new questions and rendering
   */
  formElem.addEventListener("formdata", async function(e) {
    const pickedOption = e.formData.get("solution");
    await quiz.solve(pickedOption);
    await quiz.highlightCorrect();
    await ((ms) => new Promise((r) => setTimeout(r, ms)))(1000);
    quiz.questionID++;
    await quiz.loadQuestion();
    quiz.render();
  });
}, false);
