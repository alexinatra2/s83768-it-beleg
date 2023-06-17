/**
 * @author Alexander Holzknecht
 */

/**
 * Define the available themess
 *
 * @type {{light: string, dark: string, solar: string}}
 */
const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark",
};

const theme = localStorage.getItem("theme") ||
  (tmp = Object.keys(themeMap)[0], localStorage.setItem("theme", tmp), tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

/**
 * A utility to get the next theme from the defined list and
 * modify the DOM accordingly
 */
function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("themeButton").onclick = toggleTheme;
});
