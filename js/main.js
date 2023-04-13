const api_base_url = "https://irene.informatik.htw-dresden.de:8888/api/quizzes/";

// utility for checking a radio button option
function check(event) {
  var elem = event.target;
  var optionsElem = document.getElementById("options");
  var options = optionsElem.children;
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    option.classList.remove("selected");
  }
  elem.classList.add("selected");
  var inputElem = elem.querySelector("input");
  inputElem.checked = true;
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
    }
  );
  return await response.json();
}
