/**
 * Defines the topic data containing the font awesome icon name and the category's German name
 *
 * @type {{general: {icon: string, label: string}, music: {icon: string, label: string}, maths: {icon: string, label: string}, it: {icon: string, label: string}, people: {icon: string, label: string}, home: {icon: string, label: string}}}
 */
const TOPIC_DATA = {
  "home": {
    "icon": "fa-solid fa-house",
    "label": "Lernapp",
  },
  "general": {
    "icon": "fa-solid fa-earth-europe",
    "label": "Allgemein",
  },
  "maths": {
    "icon": "fa-solid fa-square-root-variable",
    "label": "Mathematik",
  },
  "it": {
    "icon": "fa-brands fa-firefox-browser",
    "label": "Internettechnologien",
  },
  "music": {
    "icon": "fa-solid fa-music",
    "label": "Musik",
  },
  "people": {
    "icon": "fa-solid fa-landmark-dome",
    "label": "Personen",
  }
};

/**
 * Defines the theme button icons for the three available themes
 *
 * @type {{lightIcon: string, solarIcon: string, darkIcon: string}}
 */
const THEME_BUTTON_ICONS = {
  "darkIcon": "fa-solid fa-moon",
  "lightIcon": "fa-solid fa-sun",
  "solarIcon": "fa-solid fa-solar-panel",
};

/**
 * @author Alexander Holzknecht
 *
 * A builder class for dynamically generating a nav bar
 */
class Navigation {
  navElem;
  ulElem;
  navItems;

  /**
   * constructor for Navigation class. It is responsible for creating the
   * skeleton of the nav bar
   */
  constructor() {
    this.navElem = document.createElement("nav");
    this.navElem.classList.add("navbar");

    const ulElem = document.createElement("ul");
    ulElem.classList.add("navbar-nav");
    this.ulElem = ulElem;
    this.navElem.appendChild(this.ulElem);
    this.navItems = [];
  }

  /**
   * Builder method to add a topic
   *
   * @param topicName the topic to be added, strings should exactly match keys in TOPIC_DATA
   * @returns {Navigation} the navigation element
   */
  addNavItem(topicName) {
    const topic = TOPIC_DATA[topicName];
    const label = topic.label;
    const icon = topic.icon;

    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "javascript:window.location.reload(true)");
    navLinkElem.addEventListener("click", () => changeCategory(topicName));

    const navIconElem = document.createElement("i");
    navIconElem.setAttribute("class", icon);

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    navLinkElem.appendChild(navIconElem);
    navLinkElem.appendChild(navLabelElem);
    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this;
  }

  /**
   * Builder method to add a home logo
   *
   * @returns {Navigation} The Navigation object
   */
  addHomeLogo() {
    const newHomeLogoElem = document.createElement("li");
    newHomeLogoElem.classList.add("home-logo");

    const homeData = TOPIC_DATA.home;
    const icon = homeData.icon;
    const label = homeData.label;

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "index.html");

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = label;

    const navIconElem = document.createElement("i");
    navIconElem.setAttribute("class", icon);

    navLinkElem.appendChild(navLabelElem);
    navLinkElem.appendChild(navIconElem);
    newHomeLogoElem.appendChild(navLinkElem);

    this.navItems.push(newHomeLogoElem);
    return this;
  }

  /**
   * Builder method for adding a theme button
   *
   * @returns {Navigation} The Navigation object
   */
  addThemeButton() {
    const newNavItemElem = document.createElement("li");
    newNavItemElem.classList.add("nav-item");
    newNavItemElem.setAttribute("id", "themeButton");

    const darkIcon = THEME_BUTTON_ICONS.darkIcon;
    const lightIcon = THEME_BUTTON_ICONS.lightIcon;
    const solarIcon = THEME_BUTTON_ICONS.solarIcon;

    const navLinkElem = document.createElement("a");
    navLinkElem.classList.add("nav-link");
    navLinkElem.setAttribute("href", "#");

    const darkIconElem = document.createElement("i");
    darkIconElem.setAttribute("class", darkIcon);
    darkIconElem.setAttribute("id", "darkIcon");
    navLinkElem.appendChild(darkIconElem);

    const lightIconElem = document.createElement("i");
    lightIconElem.setAttribute("class", lightIcon);
    lightIconElem.setAttribute("id", "lightIcon");
    navLinkElem.appendChild(lightIconElem);

    const solarIconElem = document.createElement("i");
    solarIconElem.setAttribute("class", solarIcon);
    solarIconElem.setAttribute("id", "solarIcon");
    navLinkElem.appendChild(solarIconElem);

    const navLabelElem = document.createElement("span");
    navLabelElem.classList.add("link-text");
    navLabelElem.textContent = "Farben";
    navLinkElem.appendChild(navLabelElem);

    newNavItemElem.appendChild(navLinkElem);

    this.navItems.push(newNavItemElem);
    return this;
  }

  /**
   * Adds the Navigation element to the DOM
   */
  create() {
    this.navItems.forEach((item) => {
      this.ulElem.appendChild(item);
    });
    document.body.appendChild(this.navElem);
  }
}

/**
 * Define the list of all categories present
 *
 * @type {string[]}
 */
const categoryList = ["general", "maths", "it", "music", "people"];

/**
 * A function for adding the category information to the DOM.
 * It retrieves the selected category from local storage and defaults to
 * the "general" category if the corresponding element does not yet exists
 */
function setCategoryInDOM() {
  const mainElem = document.querySelector("main");
  let temp;
  const category = localStorage.getItem("category") ||
      (temp = categoryList[0], localStorage.setItem("category", temp), temp);
  mainElem.className = "category-" + category;
}

/**
 * A function for changing the local storage variable for the selected
 * category and simultaneously changing the DOM category
 *
 * @param newCategory
 */
function changeCategory(newCategory) {
  localStorage.setItem("category", newCategory);
  console.log(getCategory());
  setCategoryInDOM();
}

/**
 *
 * @returns {string} the selected category string
 */
function getCategory() {
  const category = localStorage.getItem("category");
  if (category == null) {
    setCategoryInDOM();
    return categoryList[0];
  }
  return category;
}

/**
 * On window load the category should be added to the DOM such as to
 * display the correct information
 */
document.addEventListener("DOMContentLoaded", function () {
  setCategoryInDOM();
});