let env;

async function loadEnv(envPath) {
  env = await fetch(envPath).then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
  return env;
}

let selectionPending = true;

// utility for checking a radio button option
function check(event) {
  const elem = event.target;
  if (!elem.classList.contains("option")) {
    throw 'check(event) was called on a non-".option" element.';
  }
  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    option.classList.remove("selected");
  }

  elem.classList.add("selected");
  const inputElem = elem.querySelector("input");
  inputElem.checked = true;

  if (selectionPending) {
    const submitButtonElem = document.querySelector(".ready,.pending");
    const submitButtonElemClasses = submitButtonElem.classList;
    submitButtonElemClasses.remove("pending");
    submitButtonElemClasses.add("ready");
  }
}
