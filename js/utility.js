async function loadEnv(envPath) {
  let env = await fetch(envPath).then((response) => response.json());
  env.API_BASE_URL = env.WEB_QUIZ_URL + env.WEB_QUIZ_API_PATH;
  return env;
}

let selectionPending = true;

/**
 * utility for checking a radio button option
 */
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

/*
copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
by user ns16
Randomize array in-place using Durstenfeld shuffle algorithm
*/
const getShuffledArr = arr => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};
